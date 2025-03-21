const menuButton = document.getElementById ("menuIcon");
const menuOptions = document.getElementById ("menuOptions");

let menuLoaded = false;

menuButton.addEventListener ("click", () =>  {
    if (!menuLoaded){
        fetch ('menu.html')
        .then (response => respomse.text())
        .then (data => {
            menuOptions.innerHTML = data;
            menuOptions.style.display = "flex";
            menuLoaded = true;
        });

    } else {
        menuOptions.style.display =
        menuOptions.style.display === "flex" ? "none" : "flex";

    }
});

window.addEventListener ("click", function (e){
    if(!menuButton.contains(e.target) && !menuOptions.contains (e.target)) {
        menuOptions.style.display = "none";
    }

    });