let opt = {
  margin: 1,
  filename: "web.pdf",
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
};

function generatePdf() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.executeScript(
      activeTab.id,
      {
        code: "const content = document.documentElement.outerHTML; content;",
      },
      function (result) {
        const htmlContent = result[0];
        const element = document.createElement("div");
        element.innerHTML = htmlContent;

        html2pdf().set(opt).from(element).save();
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.querySelector(".download-btn");
  downloadButton.addEventListener("click", generatePdf);
});
