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
const repeatMusic = document.getElementById("repeatMusic");

let playlist = [];
let currentTrack = 0;


//function to access electron memory and check if there is a folder saved there

document.addEventListener("DOMContentLoaded", async() => {
    const folderPath = localStorage.getItem("folderPath");

    if(folderPath){

        const files = await window.electron.getFilesFromPath(folderPath);
        if (files && files.length > 0) {
            playlist = files;
            currentTrack = 0;
             await loadTrack(currentTrack);
        }
    }

})


async function loadTrack(index) {
    if (playlist.length === 0) return;

    const track = playlist[index];
    audio.src = track.src;

    const trackMetadata = await window.electron.getMetadata(track.src);
    trackTitle.textContent = trackMetadata.title;
    trackArtist.textContent = trackMetadata.artist;
    trackAlbum.textContent = trackMetadata.album;
    trackYear.textContent = trackMetadata.year;
    albumPhoto.src = trackMetadata.picture || "music/default.webp";

    audio.load();
    audio.play();
    pauseMusic.textContent = "||";

    connectVisualizer();
}

pauseMusic.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        pauseMusic.textContent = "||";
    } else {
        audio.pause();
        pauseMusic.textContent = "▶️️";
    }
});

nextMusic.addEventListener("click", async () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    await loadTrack(currentTrack);
});

prevMusic.addEventListener("click", async () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    await loadTrack(currentTrack);
});

repeatMusic.addEventListener("click", () => {
    audio.loop = !audio.loop;
    repeatMusic.style.backgroundColor = audio.loop ? "green" : "";
    repeatMusic.title = audio.loop ? "looping enabled" : "not repeating";
});

// Select Folder and Load MP3s
selectFolderButton.addEventListener("click", async () => {
    const files = await window.electron.selectFolder();

    if (files.files && files.files.length > 0) {
        playlist = files.files;
        currentTrack = 0;
        loadTrack(currentTrack);
        localStorage.setItem("folderPath", files.folderPath)
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const timeAudio = document.getElementById("curTime");

    audio.addEventListener("timeupdate", () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        timeAudio.textContent = formatTime(Math.floor(audio.currentTime));
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    }
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

audio.addEventListener("ended", () => {
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

});

function connectVisualizer() {
    // if (window.audioSource) {
    //     window.audioSource.disconnect();
    // }

    const audioCtx = window.audioCtx || new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 128;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const barWidth = WIDTH / bufferLength;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            const x = i * barWidth;
            ctx.fillStyle = `hsl(${i * 10}, 100%, 50%)`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth - 1, barHeight);

        }
    }

    draw();

    window.audioCtx = audioCtx;
    window.audioSource = source;

}
;


menuButton.addEventListener ("click", () => {
    menuOptions.classList.toggle('open');



});

function toggleTheme() {
    document.querySelector(".musicPlayer").classList.toggle("light-mode");
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") document.body.classList.add("light-mode");
});

const menuButton = document.getElementById("menuIcon");
const menuOptions = document.getElementById("menuOptions");

menuButton.addEventListener("click", () => {
    menuOptions.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!menuOptions.contains(e.target) && !menuButton.contains(e.target)) {
        menuOptions.classList.remove("open");
    }
});













































function connectVisualizer() {
    // if (window.audioSource) {
    //     window.audioSource.disconnect();
    // }

    const audioCtx = window.audioCtx || new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 128;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const barWidth = WIDTH / bufferLength;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] / 2;
            const x = i * barWidth;
            ctx.fillStyle = `hsl(${i * 10}, 100%, 50%)`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth - 1, barHeight);
        }
    }

    draw();

    window.audioCtx = audioCtx;
    window.audioSource = source;
}
