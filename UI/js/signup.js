(() => {
  let submit2 = document.getElementById("submit2");
  submit2.addEventListener("click", event => {
    event.preventDefault();
    location.assign("index.html");
  });
})();