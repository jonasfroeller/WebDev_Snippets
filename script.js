[...document.getElementsByClassName("snippet")].forEach(element => {
  element.addEventListener("click", () => {
    getSnippet(element.getAttribute("data-snippet"));
  });
});

getSnippet("default.css");

function getSnippet(snippet) {
  fetch(`https://webdev-snippets.pages.dev/snippets/${snippet}`)
  .then(response => response.text())
  .then(text => {
    document.getElementById("code").textContent = text;
    hljs.highlightElement(document.getElementById('code'));
    document.getElementById("snippet-name").innerText = snippet;
    document.getElementById("snippet-name").addEventListener("click", function () {
      navigator.clipboard.writeText(document.getElementById("code").textContent);
      alert("Copied to clipboard");
    })
  });
}