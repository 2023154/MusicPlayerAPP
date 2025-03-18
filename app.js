const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const prevMusic = document.getElementById("prevMusic");
const nextMusic = document.getElementById("nextMusic");
const pauseMusic = document.getElementById("pauseMusic");
const trackTitle = document.getElementById("trackTitle");

const playlist = [
    {title: "1 cuff-it-wetter 1", src:"music/cuff-it-wetter.mp3"},
    {title: "song 2", src:"..."},
    {title: "song 3", src:"..."},
    {title: "4 cuff-it-wetter 1", src:"music/cuff-it-wetter.mp3"},
    {title: "song 5", src:"..."},
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
    audio.play();


})

audio.addEventListener("timeupdate", () => {
    audio.currentTime = (progressBar / 100) * audio



})