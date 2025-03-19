const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const prevMusic = document.getElementById("prevMusic");
const nextMusic = document.getElementById("nextMusic");
const pauseMusic = document.getElementById("pauseMusic");
const trackTitle = document.getElementById("trackTitle");
const albumPhoto = document.getElementById("albumPhoto");
// const themeToggle = document.getElementById("themeToggle");
// const menuIcon = document.getElementById("menuIcon");
//


const playlist = [
    {title: "1 cuff-it-wetter 1",  src:"music/cuff-it-wetter.mp3", img:"music/img.png"},
    {title: "song 2", src:"...", img: ""}, // need more songss.
    {title: "song 3", src:"..."}, // need more songss.
    {title: "4 cuff-it-wetter 1", src:"music/cuff-it-wetter.mp3"},
    {title: "song 5", src:"..."}, // need more songss.
    {title: "song 6", src:"..."},
    {title: "song 7", src:"..."},
    {title: "song 8", src:"..."},
    {title: "song 9", src:"..."},
    {title: "song 10", src:"..."}
];
let currentTrack = 0;

function loadTrack(index) {
    audio.src = playlist[index].src;
    trackTitle.textContent = playlist[index].title;
   if (playlist[index].img ) {
       albumPhoto.src = playlist[index].img;
   }else{
       albumPhoto.src =  "music/default.webp";
   }

    audio.load();
}
pauseMusic.addEventListener("click", () => {
    if(audio.paused) {
        audio.play();

        pauseMusic.textContent = "||";
    }else{


        audio.pause();
        pauseMusic.textContent = "▶️️"; // when we click in the emo
    }
});




//next music
nextMusic.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audio.play();
    pauseMusic.textContent = "||";

});
prevMusic.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;


    loadTrack(currentTrack);


    albumPhoto.src = playlist[index].img || "music/default.webp";
    audio.play();



})

audio.addEventListener("timeupdate", () => {
    audio.currentTime = (progressBar / 100) * audio
});


progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar / 100) * audio.duration;
});
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

audio.addEventListener("ended", () =>{
    nextMusic.click();
})

if (localStorage.geItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌞";

}
themeToggle.addEventListener("click", () => {
    document.body.classList.remove("light-mode");

    if (ddocument.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🔆";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌑";
    }
});

menuIcon.addEventListener("click", () => {
    alert("lateral menu")
});