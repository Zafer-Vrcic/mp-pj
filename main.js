const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

// line
let index;
// loop
let loop = true;

// json playlist style

const songsList = [
  {
    name: "Disfruto",
    link: "assets/Carla Morrison - Disfruto.mp3",
    artist: "Carla Morrison",
    image: "assets/Carla Morrison.jpeg",
  },
  {
    name: "Everybody Here Want You",
    link: "assets/Jeff Buckley - Everybody Here Wants You.mp3",
    artist: "Jeff Buckley",
    image: "assets/Jeff-Buckley2.jpg",
  },
  {
    name: "u vas me détruire",
    link: "assets/Notre Dame de Paris Musical-u vas me détruire.mp3",
    artist: "Notre Dame de Paris Musical",
    image: "assets/Notre Dame de Paris Musical.jpg",
  },
  {
    name: "What Could Have Been",
    link: "assets/Novembers Doom - What Could Have Been.mp3",
    artist: "Novembers Doom",
    image: "assets/Novembers-Doom.jpg",
  },
  {
    name: "Jane Maryam",
    link: "assets/Sara Naeini - Jane Maryam.mp3",
    artist: "Sara Naeini",
    image: "assets/Sara Naeini - Jane Maryam.jpg",
  },
  
];

// time formatter
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

// set songs
const setSong = (arrayIndex) => {
  // console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  // set audio
  songName.innerHTML = name;
  audio.src = link;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
    // console.log(onloadeddata);
  };
  playListContainer.classList.add('hide')
  playAudio()
  // playAudio()
};

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};
const nextSong = () => {
  if (!loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
    playAudio();
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
    playAudio;
  }
};

const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

audio.onended = () => {
  nextSong();
};

progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  // console.log(coordStart);
  // console.log(coordEnd);
  // console.log(progress);
  // console.log(audio.currentTime);

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});
// shuffle
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("mixing closed");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("mix start");
  }
});

// repeat active
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
    console.log("again closed");
  } else {
    repeatButton.classList.add("active");
    loop = true;
    console("again start");
  }
});
 const initializePlayList= () =>{
  for (const i in songsList) {
   playListSongs.innerHTML += `<li class="playlistSong"
  onclick="setSong(${i})">
  <div class="playlist-image-container">
  <img src="${songsList[i].image}"/>
  </div>
  <div class="playlist-song-details">
  <span id="playlist-song-name">
  ${songsList[i].name}
  </span>
  <span id="playlist-song-artist-album">
  ${songsList[i].artist}
  </span>
  </div>
  </li>`
   }
 }
playListButton.addEventListener('click', ()=>{
  playListContainer.classList.remove('hide')
})
closeButton.addEventListener('click',()=>{
  playListContainer.classList.add('hide')
})


// play button
playButton.addEventListener("click", playAudio);
// pause button
pauseButton.addEventListener("click", pauseAudio);
// forward
nextButton.addEventListener("click", nextSong);
// prew
prevButton.addEventListener("click", previousSong);

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width=(audio.currentTime / audio.duration.toFixed(3)) *
    100 +
    "%";
}, 1000);
// time update
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// when screen loading
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlayList()
};
