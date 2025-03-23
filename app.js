const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const prevMusic = document.getElementById("prevMusic");
const nextMusic = document.getElementById("nextMusic");
const pauseMusic = document.getElementById("pauseMusic");
const trackTitle = document.getElementById("trackTitle");
const albumPhoto = document.getElementById("albumPhoto");



let playlist = [
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

let currentTrack = -1;


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

//prevMusic
prevMusic.addEventListener("click", () => {

    let currentTrack = 0;
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;

    loadTrack(currentTrack);

    albumPhoto.src = playlist[index].img || "music/default.webp";
    audio.play();

});


// update the time of the audio

document.addEventListener("DOMContentLoaded", () => {
    const timeAudio =document.getElementById("curTime");
    audio.addEventListener("timeupdate",()=>{

        // if(audio.duration){
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        // }

        const seconds = Math.floor(audio.currentTime);
        timeAudio.textContent = formatTime(seconds);
    });
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;

    }

 });

//progess bar.

progressBar.addEventListener("input", () => {
    const value = progressBar.value;
    const duration = audio.duration || 0;
    audio.currentTime = (value/100) * duration;
});
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

audio.addEventListener("ended", () =>{
    nextMusic.click();
})
//darkmode function.
function toggleTheme(){

    //const player = document.getElementsByClassName(".musicPlayer");
    document.querySelector(".musicPlayer").classList.toggle("light-mode");
   // document.player.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")){
        localStorage.setItem("theme", "light");
    }else{
        localStorage.setItem("theme", "dark");
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme==="light"){
        document.body.classList.add("light-mode");
    }
}
);

const menuButton = document.getElementById ("menuIcon");
const menuOptions = document.getElementById ("menuOptions");


menuButton.addEventListener ("click", () => {
    menuOptions.classList.toggle('open');


});
document.addEventListener("click", (e) =>{
    if(!menuOptions.contains(e.target) && ! menuButton.contains(e.target)) {
        menuOptions.classList.remove ("open");
    }

})
