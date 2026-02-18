// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");

  // 입력창 생성
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "1 또는 2 입력";

  // 버튼 생성
  const button = document.createElement("button");
  button.textContent = "확인";

  // 결과 출력 영역 생성
  const resultDiv = document.createElement("div");
  resultDiv.id = "result";

  // 버튼 클릭 이벤트
  button.addEventListener("click", () => {
    loadData(input.value);
  });

  container.appendChild(input);
  container.appendChild(button);
  document.body.appendChild(container);
  document.body.appendChild(resultDiv);
});

function loadData(number) {
  let fileName = "";

  if (number === "1") {
    fileName = "test.json";
  } else if (number === "2") {
    fileName = "test2.json";
  } else {
    alert("1 또는 2만 입력하세요.");
    return;
  }

  fetch(`./file/${fileName}`)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      data.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.no}. ${item.en} - ${item.ko}`;
        resultDiv.appendChild(p);
      });
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
}
