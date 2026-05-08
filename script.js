const CLOUD_ENDPOINT = "https://script.google.com/macros/s/AKfycbw8UNLqeikB650y9Ll-hHArmF4gxuWjAiyqLNQMHNnyp7yUIrVU-23GLsLcMm6XbiCgqg/exec";

const form = document.querySelector("#worksheetForm");
const statusMessage = document.querySelector("#statusMessage");
const downloadButton = document.querySelector("#downloadJson");

function getFormData() {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.model = formData.getAll("model").join(", ");
  data.submittedAt = new Date().toISOString();
  return data;
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "#b3261e" : "#315b85";
}

function syncFormState(clone, source) {
  const sourceFields = source.querySelectorAll("input, textarea");
  const cloneFields = clone.querySelectorAll("input, textarea");

  sourceFields.forEach((field, index) => {
    const clonedField = cloneFields[index];
    if (!clonedField) return;

    if (field.type === "radio" || field.type === "checkbox") {
      if (field.checked) {
        clonedField.setAttribute("checked", "checked");
      } else {
        clonedField.removeAttribute("checked");
      }
      return;
    }

    if (field.tagName === "TEXTAREA") {
      clonedField.textContent = field.value;
      return;
    }

    clonedField.setAttribute("value", field.value);
  });
}

async function captureWorksheetImage() {
  const page = document.querySelector(".page");
  if (!window.html2canvas) {
    throw new Error("html2canvas is not loaded");
  }

  const actions = page.querySelector(".actions");
  const status = page.querySelector("#statusMessage");
  const previousActionsDisplay = actions?.style.display;
  const previousStatusDisplay = status?.style.display;

  if (actions) actions.style.display = "none";
  if (status) status.style.display = "none";

  const canvas = await window.html2canvas(page, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
    windowWidth: page.scrollWidth,
    windowHeight: page.scrollHeight,
  });

  if (actions) actions.style.display = previousActionsDisplay || "";
  if (status) status.style.display = previousStatusDisplay || "";

  return canvas.toDataURL("image/png");
}

function downloadImage(dataUrl, fileName) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const payload = getFormData();
  const safeName = payload.university || payload.courseName || "worksheet";
  const screenshotFileName = `${safeName.replace(/[\\/:*?"<>|]/g, "_")}-${new Date().toISOString().slice(0, 10)}.png`;

  if (!CLOUD_ENDPOINT) {
    setStatus("클라우드 제출 주소가 아직 연결되지 않았습니다. script.js의 CLOUD_ENDPOINT에 Apps Script 웹앱 주소를 넣어주세요.", true);
    return;
  }

  submitButton.disabled = true;
  setStatus("화면 이미지를 만들고 제출 중입니다...");

  try {
    const screenshotDataUrl = await captureWorksheetImage();
    downloadImage(screenshotDataUrl, screenshotFileName);

    payload.screenshotFileName = screenshotFileName;
    payload.screenshotDataUrl = screenshotDataUrl;

    const response = await fetch(CLOUD_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    setStatus("제출되었습니다. 스크린샷 파일도 저장했습니다.");
    form.reset();
  } catch (error) {
    setStatus("제출 또는 스크린샷 저장 중 문제가 발생했습니다. 입력 내용과 제출 주소를 확인해주세요.", true);
  } finally {
    submitButton.disabled = false;
  }
});

downloadButton.addEventListener("click", () => {
  const payload = getFormData();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `worksheet-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  setStatus("응답 파일을 저장했습니다.");
});
