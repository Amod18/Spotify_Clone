console.log("Welcome to spotify!");
// Initializing variables 
let songIndex = 0;
let audioElement = new Audio('../songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Bella Ciao", filePath: "../songs/1.mp3", coverPath: "../covers/1.jpg" },
    { songName: "Aabaad Barbaad", filePath: "../songs/2.mp3", coverPath: "../covers/2.jpg" },
    { songName: "Choosing Wrong", filePath: "../songs/3.mp3", coverPath: "../covers/3.jpg" },
    { songName: "Red Right Hand", filePath: "../songs/4.mp3", coverPath: "../covers/4.jpg" },
    { songName: "Ranjha", filePath: "../songs/5.mp3", coverPath: "../covers/5.jpg" },
    { songName: "Mann Bharya", filePath: "../songs/6.mp3", coverPath: "../covers/6.jpg" },
    { songName: "Grind", filePath: "../songs/7.mp3", coverPath: "../covers/7.jpg" },
    { songName: "ABC", filePath: "../songs/8.mp3", coverPath: "../covers/8.jpg" },
    { songName: "XYZ", filePath: "../songs/8.mp3", coverPath: "../covers/9.jpg" },
    { songName: "Na Ja", filePath: "../songs/10.mp3", coverPath: "../covers/10.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// Handling the play/pause button 

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbaar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle")
            masterPlay.classList.add("fa-pause-circle")
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-pause-circle")
            masterPlay.classList.add("fa-play-circle")
        }
    })
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1
        gif.style.opacity = 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1
        gif.style.opacity = 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")
});