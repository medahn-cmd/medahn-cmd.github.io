window.RESULT_FIGURES=(()=>{
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const figure=(name,title,description)=>`<figure class="result-figure"><figcaption><h3>${title}</h3><p>${description}</p></figcaption><a class="figure-open" href="figure-${name}.webp" target="_blank" rel="noopener" aria-label="${title} 크게 보기 (새 탭)"><img src="figure-${name}.webp" loading="lazy" decoding="async" alt="${title}. ${description}"><span>그림 크게 보기 ↗</span></a></figure>`;
const table=(title,head,rows)=>`<div class="table-wrap figure-table" tabindex="0" role="region" aria-label="${title}"><table><caption>${title}</caption><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((c,i)=>`<${i?'td':'th scope="row"'}>${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const areas=[
 ['지역자원 개발','실습 기반','참여 가능한 기관과 협조체계를 확보하는 영역입니다. 지역의 보건·의료기관과 관계자를 파악하고 실습자원으로 연결합니다.'],
 ['연계체계 구축','실습 기반','대학과 기관의 협력 관계를 구조화하는 영역입니다. 권역별 대학 연합과 기관 간 역할 분담을 통해 실습을 지속적으로 운영할 기반을 마련합니다.'],
 ['의료진·담당자 참여','실습 기반','현장 의료진과 담당자의 교육 참여를 확보하는 영역입니다. 담당 역할과 협조체계를 명확하게 하고, 참여를 지속할 수 있는 여건을 점검합니다.'],
 ['실습 운영 방향','실습 운영','지역의 건강문제와 임상 경험 중 어떤 교육적 가치를 중심에 둘지 정하는 영역입니다. 대학의 교육목표와 현장의 특성을 연결합니다.'],
 ['교과목 운영 방향','실습 운영','필수·선택 교과목 여부와 학점 등 학사 구조를 정하는 영역입니다. 지역사회 경험이 정규 교육과정 안에서 어떻게 인정되는지 설계합니다.'],
 ['실습 운영 방안','실습 운영','학습목표, 활동, 과제, 평가를 실제 운영 지침으로 연결하는 영역입니다. 학생과 지도자를 위한 안내, 지도·피드백 체계를 함께 준비합니다.'],
 ['학생 생활지원','학생 지원','숙박과 이동 등 안정적으로 참여할 수 있는 생활 여건을 점검하는 영역입니다. 실습 장소가 달라져도 학생의 학습이 이어지도록 지원합니다.'],
 ['학생 모니터링','학생 지원','출석과 학습 진행 상황을 확인하고 정기적으로 피드백하는 영역입니다. 실습 중 어려움을 파악하여 대학과 현장이 함께 대응합니다.'],
 ['학생 안전관리','학생 지원','보험과 위험관리를 포함해 안전한 참여 조건을 점검하는 영역입니다. 사전 안내와 안전관리 체계를 실습 운영에 포함합니다.']
];
const areaCards=()=>`<div class="checklist-grid">${areas.map(([title,group,desc],i)=>`<article><span class="checklist-number">${String(i+1).padStart(2,'0')}</span><small>${group}</small><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div>`;
const modelRows=[
 ['지역기반 통합 로테이션형','지역·임상 통합 경험과 연속성','의료원·보건소·지역기관을 순환','외래·병동과 지역사업, 기관 간 연계 사례관리','필수경험 체크리스트·연속성 포트폴리오','기관 간 연결, 이동·생활 지원, 전담 코디네이터'],
 ['지역사회보건·건강문제 해결형','건강문제 분석과 보건기획 역량','보건소·지자체·유관기관 중심','지역 통계 분석, 방문, 보건사업 기획','지역건강 진단보고서·보건기획안','지자체 협력과 지역 멘토단'],
 ['지역공공병원 임상몰입형','공공병원 환경의 일차진료 임상역량','공공병원·의료원 단일 기관 또는 병원군','외래·병동·응급실, 팀 기반 진료','환자 사례 기록·Mini-CEX 평가','병원의 수용역량과 지도체계'],
 ['지역사회 개원가(일차의료) 중심형','지역 개원가의 일차의료 경험','지역 개원의원과 2차병원 협력','만성질환 관리·상담, 의뢰·회송 체계 이해','외래 사례 기록·일차진료 성찰일지','개원의 협력 네트워크와 소규모 그룹 순환']
];
const modelCards=()=>`<div class="model-explanations">${modelRows.map((r,i)=>`<article style="--model-color:${['#3378cc','#148778','#7853b5','#c76525'][i]}"><small>MODEL ${String(i+1).padStart(2,'0')}</small><h3>${r[0]}</h3><p>${r[1]}을 중심으로 설계합니다.</p><dl><dt>실습 현장</dt><dd>${r[2]}</dd><dt>학습 경험</dt><dd>${r[3]}</dd><dt>학생 산출물</dt><dd>${r[4]}</dd><dt>운영의 핵심</dt><dd>${r[5]}</dd></dl></article>`).join('')}</div>`;
const checklistFig=()=>figure('community-checklist','지역사회 실습 운영 체크리스트의 9개 핵심 영역','실습 기반 조성 → 실습 운영 → 학생 지원으로 이어지는 공통 점검 체계입니다.');
const modelFig=()=>figure('community-models','지역사회기반 교육과정 운영 모형 비교','네 가지 모형을 핵심 포커스, 실습장 구성, 주요 학습경험, 대표 산출물, 운영 포인트로 비교합니다.');
const frameworkFig=()=>figure('community-framework','교육과정 운영 모형의 6차원 설계 틀','교육목표, 실습장 구성, 핵심 학습경험, 학생 산출물, 평가체계, 운영·지원 요건을 함께 검토합니다.');
const typesFig=()=>figure('community-types','지역사회기반 교육 프로그램의 유형','봉사중심·연구중심·훈련중심의 교육 접근을 구분한 개념도입니다. 네 가지 현장 운영 모형과 함께 설계의 방향을 이해하는 데 활용합니다.');
const development=`<div class="checklist-development"><h3>체크리스트 개발·공유 과정</h3><ol><li><b>2025.10</b><span>초안 작성과 운영팀 전원 검토·동의</span></li><li><b>2025.11</b><span>학술대회 공개와 의견 수렴</span></li><li><b>2025.12</b><span>전국 실행팀 워크숍 검토·환류</span></li><li><b>v1.0 확정</b><span>9개 영역의 공통 점검 체계 완성</span></li><li><b>2026.02–03</b><span>모형별 엑셀 워크시트 확장·워크숍 적용</span></li></ol></div>`;
const developmentNote='<p class="figure-note">1차년도에는 합의와 현장 검토를 거쳐 체크리스트 v1.0을 확정·공유했습니다. 항목별 중요도와 실행가능성의 정량적 검증은 후속 시범운영에서 보완합니다.</p>';
const community=window.RESULTS_DATA.projects.find(p=>p.id==='community');
const checklistIndex=community.sections.length;
community.sections.push({title:'지역사회 실습 운영 체크리스트 개발 결과',html:`<p>지역사회 실습을 준비하는 교수와 행정 담당자가 기반 조성부터 학생 안전관리까지 점검할 수 있도록 표준 체크리스트 v1.0을 개발했습니다. 대학별 여건에 맞게 항목을 가감하고, 모형별 워크시트와 연결하여 활용합니다.</p>${checklistFig()}${development}${developmentNote}<h2>영역별 점검 내용</h2>${areaCards()}<h2>현장 적용 방식</h2><p>대학과 실습기관이 함께 운영 여건을 확인하고, 교육목표에 맞춰 점검 항목을 조정합니다. 모델별 워크시트에 담당 역할과 보완 사항을 정리한 뒤, 워크숍과 현장 피드백을 통해 개선하는 구조입니다.</p>`});
const modelsIndex=community.sections.length;
community.sections.push({title:'교육과정 운영 모형·그림과 설계 기준',html:`<p>대학별 지역 여건과 교육목표에 따라 선택하거나 혼합할 수 있는 네 가지 운영 모형을 개발했습니다. 사례 분석을 바탕으로 유형을 정리하고, 개원가 중심형을 더해 네 가지 체계를 확정한 뒤 모형별 컨설팅에 적용했습니다.</p>${modelFig()}${modelCards()}${frameworkFig()}${table('6차원 설계 항목과 검토 내용',['설계 항목','검토 내용'],[['교육목표(LO)','사회적 책무성·일차진료 역량, 지역보건 이해, 진로탐색의 비중'],['실습장 구성','단일 기관·복합 기관, 지역사회 기관의 참여 범위, 기관 간 이동'],['핵심 학습경험','임상 진료, 지역사업·가정방문·보건교육, 보건기획 경험'],['학생 산출물','사례 기록과 성찰일지, 지역 건강문제 분석, 보건사업 기획·활동 결과'],['평가체계','지도자 평가·루브릭, 자기·동료평가, OSCE·Mini-CEX 적용 가능성'],['운영·지원 요건','수용역량, 생활 지원, 안전관리와 코디네이터·행정지원']])}${typesFig()}<p class="figure-note">봉사·연구·훈련은 교육 접근의 분류이며, 네 가지 모형은 현장 구성과 운영 방식의 분류입니다. 지역 여건과 교육목표에 따라 여러 접근과 모형을 함께 적용할 수 있습니다.</p>`});
const link=(index,label)=>`<a class="button secondary" href="#/project/community/record/${index}">${label} ↗</a>`;
function render(p){
 if(p.id==='community')return `<section class="figure-feature checklist-feature"><div class="figure-section-heading"><p class="eyebrow">핵심 개발 결과 01</p><h2>실습 전 과정을 점검하는<br>표준 체크리스트 v1.0</h2><p>운영 기반 · 실습 운영 · 학생 지원의 3대 구성원리와 9개 영역을 확정하고, 대학별 맞춤형 워크시트로 확장했습니다.</p></div>${checklistFig()}${development}${developmentNote}<div class="figure-actions">${link(checklistIndex,'9개 영역별 점검 내용 자세히 보기')}</div></section><section class="figure-feature models-feature"><div class="figure-section-heading"><p class="eyebrow">핵심 개발 결과 02</p><h2>지역의 여건에 맞게 설계하는<br>네 가지 교육과정 운영 모형</h2><p>교육의 핵심 가치와 현장 구성에 따라 모형을 선택하고, 여섯 가지 설계 기준으로 구체화합니다.</p></div>${modelFig()}${modelCards()}<div class="figure-actions">${link(modelsIndex,'교육 모형 그림과 6차원 설계 틀 보기')}</div></section>`;
 if(p.id==='digital')return `<section class="figure-feature"><div class="figure-section-heading"><p class="eyebrow">학습성과 분석</p><h2>35개 학습성과의 개발 우선순위</h2></div>${figure('digital-ipa','디지털 헬스 학습성과의 중요도–수행도 분석','가로축은 현재 교육 수준, 세로축은 교육적 필요도입니다. 중요도가 높지만 현재 교육 수준이 상대적으로 낮은 항목을 우선 개발 대상으로 분류했습니다.')}<div class="ipa-key"><span><i style="background:#e85d50"></i>우선 개발 10개</span><span><i style="background:#409acb"></i>유지·강화 9개</span><span><i style="background:#92a2a3"></i>낮은 우선순위 12개</span><span><i style="background:#e7a023"></i>투입 재검토 4개</span></div><p class="figure-note">학습성과별 교육적 필요와 현재 교육 수준을 비교한 결과입니다. 학생의 성적이나 교육 전후 효과를 나타내는 그래프는 아닙니다.</p></section>`;
 if(p.id==='integrated-six-year')return `<section class="figure-feature"><div class="figure-section-heading"><p class="eyebrow">교육과정 설계 결과</p><h2>학생의 선택을 교육과정으로 연결하기</h2></div>${figure('integrated-ep','기간별 Enrichment Period(EP) 운영 모형','4주형·9주형·18주형·1년형을 목적과 기간에 맞게 선택하고, 단일 트랙 몰입 또는 트랙 조합으로 운영하는 설계입니다.')}${figure('integrated-steps','STEPS 모형에 따른 학생맞춤형 교육과정 설계 흐름','자기이해와 진단에서 시작하여 학습환경 구성, 목표·교육과정 설계, 자기주도적 실행, 성찰과 확장으로 이어집니다.')}${figure('integrated-curriculum','통합 6년제 트랙·EP 교육과정 배치 예시','트랙과 집중 학습기간을 6년의 교육과정 안에 배치한 운영안 중 한 가지입니다. 대학별 학사 구조에 맞춰 조정하는 설계 예시입니다.')}</section>`;
 if(p.id==='question-bank')return `<section class="figure-feature"><div class="figure-section-heading"><p class="eyebrow">문항 표준화 결과물</p><h2>문항을 같은 기준으로 축적하는 입력 체계</h2></div>${figure('question-metadata','문항 메타데이터 표준 입력 양식','대학별 문항 정보를 공통 항목에 맞춰 정리하는 입력 양식입니다. 문항 분류와 축적·관리를 위한 구조를 보여줍니다.')}</section>`;
 if(p.id==='clinical-portfolio')return `<section class="figure-feature"><div class="figure-section-heading"><p class="eyebrow">평가도구 검증 결과</p><h2>일치도가 높은 항목과 보완할 항목</h2><p>평가자 23명의 채점 결과에서 주요 항목을 비교했습니다.</p></div>${table('임상실습 루브릭 주요 항목의 평가자 간 일치도',['기록지','평가항목','ICC(2,k)','95% 신뢰구간','판정'],[['수술','수술 중 관찰','0.93','0.77–0.99','Excellent'],['수술','수술 술기 이해','0.94','0.81–0.99','Excellent'],['수술','수술 후 학습','0.94','0.80–0.99','Excellent'],['입원','신체진찰','0.85','0.55–0.98','Good'],['외래','초기 치료계획','0.81','0.39–0.98','Good'],['입원','초기평가와 진단','0.39','−0.84–0.93','보완 필요'],['입원','검사계획 수립','0.41','−0.75–0.93','보완 필요'],['수술','수술실 내 기본술기','0.44','0.01–0.90','보완 필요']])}<p class="figure-note">21개 평가항목 중 주요 결과를 발췌했습니다. 조별 평가자가 5–9명으로 적고 신뢰구간이 넓으므로 점추정치만으로 성능을 단정할 수 없습니다. 사전 채점 기준 합의 없이 수행한 워크숍 결과입니다.</p></section>`;
 return '';
}
return {render};
})();
