// ❌ JSON import 제거
// import wordData1 from "./file/test2.json" assert { type: "json" };
// import wordData2 from "./file/test.json" assert { type: "json" };

import { createMain, updateMain, navArr, navContent } from "./test2.js";

let navNum = 0;
let showKo = true;

// ⭐ 변경: fetch로 JSON 불러오기
async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("JSON 로드 실패: " + path);
  return res.json();
}

// ⭐ 변경: 전역 데이터 컨테이너
let allData = {};
let currentData = [];

// ------------------ DOM 구조 (한 번만 생성) ------------------
const { container: main, rows } = createMain();
document.body.appendChild(main);

// 체크박스 -------------------------------------------------------
const check = document.createElement("input");
check.className = "check";
check.type = "checkbox";
check.checked = true;
document.body.appendChild(check);

check.addEventListener("change", () => {
  showKo = check.checked;
  render();
});

// 다크모드 체크박스 -----------------------------------------------
const darkMode = document.createElement("input");
darkMode.type = "checkbox";
darkMode.className = "darkMode";
document.body.appendChild(darkMode);

darkMode.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");

  localStorage.setItem("theme", darkMode.checked ? "dark" : "light");
});

// 저장된 테마 적용
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  darkMode.checked = true;
}

// ------------------ JSON 선택 input ------------------
const dataInput = document.createElement("input");
dataInput.type = "text";
dataInput.placeholder = "종류";
dataInput.className = "dataInput";
document.body.appendChild(dataInput);

const loadBtn = document.createElement("button");
loadBtn.textContent = "확인";
loadBtn.className = "loadBtn";
document.body.appendChild(loadBtn);

loadBtn.addEventListener("click", () => {
  const key = dataInput.value.trim();
  if (allData[key]) {
    currentData = allData[key];
    navNum = 0;
    render();
  } else {
    alert("잘못된 번호입니다. 1, 2 중 하나를 입력하세요.");
  }
});

// 페이지 데이터 계산 (10개만)
function mainData(num) {
  const nums = navArr(num);
  return currentData.filter((item) => nums.includes(Number(item.no)));
}

// 렌더
function render() {
  const data = mainData(navNum);
  updateMain(rows, data, showKo);
}

// 네비게이션 ------------------------------------------------
const counter = navContent((num) => {
  navNum = num;
  render();
});

document.body.appendChild(counter.element);

// ------------------ 네비게이션 직접 이동 ------------------
const navInput = document.createElement("input");
navInput.type = "number";
navInput.placeholder = "페이지";
navInput.className = "navInput";
document.body.appendChild(navInput);

const goBtn = document.createElement("button");
goBtn.textContent = "확인";
goBtn.className = "goBtn";
document.body.appendChild(goBtn);

goBtn.addEventListener("click", () => {
  const pageNum = Number(navInput.value.trim());
  if (!isNaN(pageNum)) {
    navNum = pageNum;
    counter.setPage(pageNum);
    render();
  } else {
    alert("올바른 숫자를 입력하세요.");
  }
});

// ⭐ 변경: 초기화 함수 (JSON 로드 후 시작)
async function init() {
  const wordData1 = await loadJSON("./file/words_basic.json");
  const wordData2 = await loadJSON("./file/owords_1.json");
  const wordData2 = await loadJSON("./file/owords_2.json");

  allData = {
    1: wordData1,
    2: wordData2,
    3: wordData3,
  };

  currentData = wordData1; // 기본 데이터
  render();
}

// ⭐ 변경: init 실행
init();

