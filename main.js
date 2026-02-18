// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // div 생성
  const container = document.createElement("div");

  // 버튼 생성
  const button = document.createElement("button");
  button.textContent = "확인";

  // 결과 출력 영역 생성
  const resultDiv = document.createElement("div");
  resultDiv.id = "result";

  // 버튼 클릭 이벤트
  button.addEventListener("click", loadData);

  // 요소 추가
  container.appendChild(button);
  document.body.appendChild(container);
  document.body.appendChild(resultDiv);
});

function loadData() {
  fetch("./file/test.json")
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      data.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.no}. ${item["en "]} - ${item.ko}`;
        resultDiv.appendChild(p);
      });
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
}
