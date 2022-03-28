
var isPlaying = null;

let themeToggler = document.querySelector('#play');

themeToggler.onclick = () => {
    themeToggler.classList.toggle('fa-pause');
    if (themeToggler.classList.contains('fa-pause')) {
        isPlaying = true;
        document.getElementById('play').classList.add('active');
        play();
    } else {
        isPlaying = false;
        document.getElementById('play').classList.remove('active');
        pause();
    }

    document.getElementById('song').innerHTML = getTitle();
    danceOn();

}



// music set up

var musics = [
    {
        id: 0,
        name: 'Fearless',
        src: 'music/fearless.mp3'
    },

    {
        id: 1,
        name: 'Fifteen',
        src: 'music/fifteen.mp3'
    },
    {
        id: 2,
        name: 'Love Story',
        src: 'music/love-story.mp3'
    },
    {
        id: 3,
        name: 'Hey Stephen',
        src: 'music/stephen.mp3'
    },
    {
        id: 4,
        name: 'White Horse',
        src: 'music/whitehorse.mp3'
    },
    {
        id: 5,
        name: 'You Belong With Me',
        src: 'music/youbelong.mp3'
    },
    {
        id: 6,
        name: 'Breathe',
        src: 'music/breathe.mp3'
    },
    {
        id: 7,
        name: 'Tell Me Why',
        src: 'music/tellmewhy.mp3'
    },
    {
        id: 8,
        name: 'You\'re Not Sorry',
        src: 'music/yourenotsorry.mp3'
    },
    {
        id: 9,
        name: 'The Way I Loved You',
        src: 'music/thewayiloveyou.mp3'
    },
    {
        id: 10,
        name: 'Forever And Always',
        src: 'music/foreverandalways.mp3'
    },
    {
        id: 11,
        name: 'The Best Day',
        src: 'music/bestday.mp3'
    },
    {
        id: 12,
        name: 'Change',
        src: 'music/change.mp3'
    },
    {
        id: 13,
        name: 'Jump Then Fall',
        src: 'music/jumpfall.mp3'
    },
    {
        id: 14,
        name: 'Untouchable',
        src: 'music/untouchable.mp3'
    },
    {
        id: 15,
        name: 'Come In With The Rain',
        src: 'music/comeinwiththerain.mp3'
    },
    {
        id: 16,
        name: 'Superstar',
        src: 'music/superstar.mp3'
    },
    {
        id: 17,
        name: 'The Other Side Of The Door',
        src: 'music/othersideofthedoor.mp3'
    },
    {
        id: 18,
        name: 'Today Was Fairy Tale',
        src: 'music/fairytale.mp3'
    },
    {
        id: 19,
        name: 'You All Over Me',
        src: 'music/alloverme.mp3'
    },
    {
        id: 20,
        name: 'Mr. Perfectly Fine',
        src: 'music/mrperfect.mp3'
    },
    {
        id: 21,
        name: 'We Were Happy',
        src: 'music/wewerehappy.mp3'
    },
    {
        id: 22,
        name: 'That\s When',
        src: 'music/thatswhen.mp3'
    },
    {
        id: 23,
        name: 'Don\'t You',
        src: 'music/dontyou.mp3'
    },
    {
        id: 24,
        name: 'Bye Bye Baby',
        src: 'music/byebyebaby.mp3'
    }

]


var musicNo = 0;

var audio = new Audio(musics[musicNo].src);

// pause/play music

function play() {
    audio.play();
}

function pause() {
    audio.pause();
}

function load() {
    audio.load();
}

// next music 
var forward = document.getElementById('forward');
function forwardFunction() {
    pause();
    musicNo++;
    if (musicNo == 25) {
        musicNo = 0;
    }
    audio = new Audio(musics[musicNo].src);
    audio.load();
    document.getElementById('song').innerHTML = getTitle();
    if (isPlaying == true) {
        play();
    }
}
forward.addEventListener('click', forwardFunction);

// backward music
var backward = document.getElementById('backward');
function backwardFunction() {
    pause();
    musicNo--;
    if (musicNo == -1) {
        musicNo = 24;
    }
    audio = new Audio(musics[musicNo].src);
    audio.load();
    document.getElementById('song').innerHTML = getTitle();
    if (isPlaying == true) {
        play();
    }
}
backward.addEventListener('click', backwardFunction);



// return music title name
function getTitle() {
    return musics[musicNo].name;
}


// dancing music on 
function danceOn() {
    if (isPlaying == false) {
        document.getElementById('bar-1').style.animationPlayState = "paused";
        document.getElementById('bar-2').style.animationPlayState = "paused";
        document.getElementById('bar-3').style.animationPlayState = "paused";
        document.getElementById('bar-4').style.animationPlayState = "paused";
        document.getElementById('bar-5').style.animationPlayState = "paused";
        document.getElementById('bar-6').style.animationPlayState = "paused";
        document.getElementById('bar-7').style.animationPlayState = "paused";
        document.getElementById('bar-8').style.animationPlayState = "paused";
        document.getElementById('bar-9').style.animationPlayState = "paused";
        document.getElementById('bar-10').style.animationPlayState = "paused";
    } else {
        document.getElementById('bar-1').style.animationPlayState = "running";
        document.getElementById('bar-2').style.animationPlayState = "running";
        document.getElementById('bar-3').style.animationPlayState = "running";
        document.getElementById('bar-4').style.animationPlayState = "running";
        document.getElementById('bar-5').style.animationPlayState = "running";
        document.getElementById('bar-6').style.animationPlayState = "running";
        document.getElementById('bar-7').style.animationPlayState = "running";
        document.getElementById('bar-8').style.animationPlayState = "running";
        document.getElementById('bar-9').style.animationPlayState = "running";
        document.getElementById('bar-10').style.animationPlayState = "running";
    }
}

// get volume 
function volume() {
    var slider = document.getElementById("myRange");
    audio.volume = slider.value / 100;
    // if music is done, then next
    if (audio.ended) {
        forwardFunction();
    }
}
setInterval(volume, 500);




// music list on phone 2
for (let i = 0; i < musics.length; i++) {
    var tag = document.createElement("p");
    var text = document.createTextNode(musics[i].name);
    tag.setAttribute('id', 'list-' + i.toString());
    tag.appendChild(text);
    var element = document.getElementById('list');
    element.appendChild(tag);
}

// when click on the list music will be selected to play

for (let i = 0; i < musics.length; i++) {
    document.getElementById('list-' + i.toString()).onclick = function () {
        document.getElementById('song').innerHTML = musics[i].name;
        pause();
        musicNo = i;
        audio = new Audio(musics[musicNo].src);
        audio.load();
        document.getElementById('song').innerHTML = getTitle();
        if (isPlaying == true) {
            play();
        }
    }
}
