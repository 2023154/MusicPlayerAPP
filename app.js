const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const prevMusic = document.getElementById("prevMusic");
const nextMusic = document.getElementById("nextMusic");
const pauseMusic = document.getElementById("pauseMusic");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const trackAlbum = document.getElementById("trackAlbum");
const trackYear = document.getElementById("trackYear");
const albumPhoto = document.getElementById("albumPhoto");
const selectFolderButton = document.getElementById("selectFolder");
const reapeat = document.getElementById("repeatMusic");

let playlist = [];
let currentTrack = 0;

    
//function to load and play a track

async function loadTrack(index){

    if(playlist.length === 0) return;

    const track = playlist[index];
    audio.src = track.src;
    const trackMetadata = await window.electron.getMetadata(track.src);
    trackTitle.textContent = trackMetadata.title;
    trackArtist.textContent = trackMetadata.artist;
    trackAlbum.textContent = trackMetadata.album;
    trackYear.textContent = trackMetadata.year;
    albumPhoto.src = trackMetadata.picture || "music/default.webp"; //sets album photo to metadata or to a default image 
    console.log("album cover src: ", trackMetadata.picture);
     

    audio.load();
    audio.play();
    pauseMusic.textContent = "||";
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
nextMusic.addEventListener("click", async () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    await loadTrack(currentTrack);
    audio.play();
    pauseMusic.textContent = "||";

});

//prevMusic
prevMusic.addEventListener("click", async () => {


    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;

    loadTrack(currentTrack);

    
    audio.play();

});

reapeat.addEventListener("click", () => {
    audio.loop = !audio.loop; // .loop is from js

    if(audio.loop){
        reapeat.style.backgroundColor = "green";
        reapeat.title = "looping enable";

    }else{
        reapeat.style.backgroundColor = "";
        reapeat.title = "not repeating";
    }
})

// Select Folder and Load MP3s
selectFolderButton.addEventListener("click", async () => {
    const files = await window.electron.selectFolder();

    if (files && files.length > 0) {
        playlist = files;
        currentTrack = 0;
        loadTrack(currentTrack);
    }
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
