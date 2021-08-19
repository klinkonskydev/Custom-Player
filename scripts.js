// Get our Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled')

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build functions

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '&#10074; &#10074;'
    toggle.innerHTML = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function heandleRangeUpdate(){
    video[this.name] = this.value;
};

function heandleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function clickTime(e){
    const timeSet = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = timeSet;
}

// Event listners

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

video.addEventListener('timeupdate', heandleProgress);

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(btn => btn.addEventListener('click', skip))

ranges.forEach( rg => rg.addEventListener('change', heandleRangeUpdate) )
ranges.forEach( rg => rg.addEventListener('mousemove', heandleRangeUpdate) )

let mousedown = false;
progress.addEventListener('click', clickTime)
progress.addEventListener('mousemove', (e) => (mousedown && clickTime(e)))

progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)