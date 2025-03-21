const menuButton = document.getElementById ("menuIcon");
const menuOptions = document.getElementById ("menuOptions");

let menuLoaded = false;

menuButton.addEventListener ("click", () =>  {
    if (!menuLoaded){
        fetch ('menu.html')
        .then (response => response.text())
        .then (data => {
            menuOptions.innerHTML = data;
            menuOptions.classList.add = ("open");
            menuLoaded = true;
        })

        .catch(error => console.error ("Error loading menu", error));

    } else {
        menuOptions.classList.toggle ("open");
    }
});

window.addEventListener ("click", function (e){
    if(!menuButton.contains(e.target) && !menuOptions.contains (e.target)) {
        menuOptionsclassList.remove ("open");
    }

    });