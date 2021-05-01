const musicContainer = document.querySelector(".music-container");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");


// Song titles
const songs = ['hey', 'summer', 'ukulele']

// Keep track of songs
let songIdx = 2;

// Initially load song into DOM
loadSong(songs[songIdx])

// Update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong(){
    songIdx--;
    if(songIdx < 0){
        songIdx = songs.length - 1;
    }

    loadSong(songs[songIdx]);
    playSong();
}

function nextSong(){
    songIdx++;
    if(songIdx > songs.length - 1){
        songIdx = 0;
    }

    loadSong(songs[songIdx]);
    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;

    progress.style.width = `${progressPercent}%`; 
}

function setProgress(e){
    const width = this.clientWidth; //width of progress bar where we clicked
    const clickX = e.offsetX;       //x coordinate of click
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
}
// Event listeners
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong()
    }
})

// Change Song

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener('timeupdate', updateProgress);

//navigate to any time in song

progressContainer.addEventListener("click", setProgress);

// Jump to next song when song ends

audio.addEventListener('ended', nextSong);