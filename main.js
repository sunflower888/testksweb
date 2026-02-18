function loadData() {
  fetch("./file/test.json")
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = ""; // 기존 내용 초기화

      data.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.no}. ${item["en"]} - ${item.ko}`;
        resultDiv.appendChild(p);
      });
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
}
