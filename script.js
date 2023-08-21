const snippetElements = document.getElementsByClassName("snippet");

[...document.getElementsByClassName("snippet")].forEach(snippet => {
  snippet.addEventListener("click", () => {
    [...snippetElements].forEach(snippetLink => {
      if (snippetLink !== snippet && snippetLink.hasAttribute("aria-current")) {
        snippetLink.removeAttribute("aria-current");
      }
    });

    snippet.setAttribute("aria-current", "page");

    getSnippet(snippet.getAttribute("data-snippet"));
  });
});

document.getElementById("snippet-name").addEventListener("click", function () {
  navigator.clipboard.writeText(document.getElementById("code").textContent);
  alert("Copied to clipboard!");
})

getSnippet("default.css");
function getSnippet(snippet) {
  fetch(`https://webdev-snippets.pages.dev/snippets/${snippet}`)
  .then(response => response.text())
  .then(text => {
    document.getElementById("code").textContent = text;
    hljs.highlightElement(document.getElementById('code'));
    document.getElementById("snippet-name").innerText = snippet;
  });
}