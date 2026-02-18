import { createMain, updateMain, navArr, navContent } from "./test2.js";

let navNum = 0;
let showKo = true;

let allData = {};
let currentData = [];

// ------------------ JSON 불러오기 함수 ------------------
async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("JSON 로딩 실패");
  return await res.json();
}

// ------------------ 초기 실행 ------------------
async function init() {
  try {
    allData = {
      1: await loadJson("./file/words_basic.json"),
      2: await loadJson("./file/owords_1.json"),
      3: await loadJson("./file/owords_2.json"),
    };

    currentData = allData[1]; // 기본값
    render();
  } catch (e) {
    console.error(e);
  }
}

// ------------------ 메인 UI 생성 ------------------
const { container: main, rows } = createMain();
document.body.appendChild(main);

// ------------------ 체크박스 (한글 표시) ------------------
const check = document.createElement("input");
check.type = "checkbox";
check.checked = true;
document.body.appendChild(check);

check.addEventListener("change", () => {
  showKo = check.checked;
  render();
});

// ------------------ 다크모드 ------------------
const darkMode = document.createElement("input");
darkMode.type = "checkbox";
document.body.appendChild(darkMode);

darkMode.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");

  if (darkMode.checked) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// 저장된 테마 적용
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  darkMode.checked = true;
}

// ------------------ JSON 선택 input ------------------
const dataInput = document.createElement("input");
dataInput.type = "text";
dataInput.placeholder = "1, 2, 3 입력";
document.body.appendChild(dataInput);

const loadBtn = document.createElement("button");
loadBtn.textContent = "확인";
document.body.appendChild(loadBtn);

loadBtn.addEventListener("click", () => {
  const key = dataInput.value.trim();
  if (allData[key]) {
    currentData = allData[key];
    navNum = 0;
    render();
  } else {
    alert("1, 2, 3 중 하나를 입력하세요.");
  }
});

// ------------------ 페이지 데이터 계산 ------------------
function mainData(num) {
  const nums = navArr(num);
  return currentData.filter((item) => nums.includes(Number(item.no)));
}

// ------------------ 렌더 ------------------
function render() {
  if (!currentData.length) return;
  const data = mainData(navNum);
  updateMain(rows, data, showKo);
}

// ------------------ 네비게이션 ------------------
const counter = navContent((num) => {
  navNum = num;
  render();
});

document.body.appendChild(counter.element);

// ------------------ 네비 직접 이동 ------------------
const navInput = document.createElement("input");
navInput.type = "number";
navInput.placeholder = "페이지";
document.body.appendChild(navInput);

const goBtn = document.createElement("button");
goBtn.textContent = "이동";
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

// ------------------ 실행 ------------------
init();

