(() => {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", event => {
        event.preventDefault();
        location.assign("dashboard.html");
    });
})();
