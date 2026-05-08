const CLOUD_ENDPOINT = "https://script.google.com/macros/s/AKfycbxp8WEH9h1bDW0P0sOtWb1UoRfSQacKCm_ndVxGeOCDWExvwhgV6hJiorgq0jooRVcbgg/exec";

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  const payload = getFormData();

  if (!CLOUD_ENDPOINT) {
    setStatus("클라우드 제출 주소가 아직 연결되지 않았습니다. script.js의 CLOUD_ENDPOINT에 Apps Script 웹앱 주소를 넣어주세요.", true);
    return;
  }

  submitButton.disabled = true;
  setStatus("제출 중입니다...");

  try {
    const response = await fetch(CLOUD_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    setStatus("제출되었습니다. 클라우드 시트를 확인해주세요.");
    form.reset();
  } catch (error) {
    setStatus("제출 중 문제가 발생했습니다. 인터넷 연결과 제출 주소를 확인해주세요.", true);
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
