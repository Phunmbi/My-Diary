(() => {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", (event) =>{
        event.preventDefault(); 
        if (location.pathname == "/index.html") {
            location.assign("dashboard.html");
        } else {
            location.assign("index.html");
        }
    
    })
})()