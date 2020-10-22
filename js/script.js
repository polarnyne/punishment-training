// UI Controller
function playPunish() {
    vid.currentTime = 0;     
    vid.play();

    setTimeout(function(){ 
        vid.pause();
    }
    , pauseTime);
};

function changeSource(url) {
    var video = document.querySelector(DOMstrings.video);
    video.src = url;
};

function displayPunish() {
    document.querySelector(DOMstrings.alert).innerHTML = 'PUNISH!';
    document.querySelector(DOMstrings.alert).style.color = '#78E28F';
    document.querySelector(DOMstrings.alert).style.display = 'block';
    setTimeout(function(){ document.querySelector(DOMstrings.alert).style.display = 'none'; }, 1000);
};

function displayBlocked() {
    document.querySelector(DOMstrings.alert).innerHTML = 'Blocked';
    document.querySelector(DOMstrings.alert).style.color = '#8c0200';
    document.querySelector(DOMstrings.alert).style.display = 'block';
    setTimeout(function(){ document.querySelector(DOMstrings.alert).style.display = 'none'; }, 1000);
};

var answer = function(option) {
    return function curried_func(e) {
        var slot = document.querySelector(option).innerHTML;
        if (slot === perfectPunish[0]) {

            // Let's show the frame data
            document.querySelector(DOMstrings.move1p).innerHTML = perfectPunish[0];
            document.querySelector(DOMstrings.move2p).innerHTML = kazumi[blockedMove][2];

            displayPunish();
            vid.play();
            vid.onended = function(e) {
                findPunish(kazumi, lili);
            };
            
            
        } else {
            displayBlocked();
        }
    }
};

// Processing data
var blockedMove, goodPunish, perfectPunish, notPunish, pauseTime, vid;

var DOMstrings = {
    infoPunish: '.info-punish',
    streak: '#streak',
    player1: '#player1',
    player2: '#player2',
    move1p: '#move-1p',
    move2p: '#move-2p',
    optionsContainer: '.options',
    option1: '#q1',
    option2: '#q2',
    option3: '#q3',
    alert: '#alert',
    playBtn: '#play-button',
    video: '#my-video'
};

function getRandomMove(min, max) {
    // function that brings a min, max number with two arguments
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
};

function getRandomFromArray(arr, n) {
    // get random numbers from an array without repeating
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

function shuffle(array) {
    // reorders the values inside an array
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
};

function findPunish(player1, player2) {
    var punishOptions;

    // player1 attacks and player2 punish
    punishOptions = new Array;
    goodPunish = new Array;
    notPunish = new Array;

    // gets a random move
    blockedMove = getRandomMove(0, (player1.length - 1));
    pauseTime = player1[blockedMove][7];
    console.log(player1[blockedMove]);

    // get a particular move (Troubleshooting)
    // blockedMove = 11;
    // pauseTime = player1[blockedMove][7];
    // console.log(player1[blockedMove]);

    for (var i = 0; i < player2.length; i++) {

        // Does the punish reach?
        if(player1[blockedMove][6] <= player2[i][5]) {
            
            if (player1[blockedMove][3] === 'low') {

                // Let's check if the attack is low and should be punished with a while standing move
                if (player2[i][1] <= ((player1[blockedMove][2] * -1)) && player2[i][0].startsWith('ws')) {
                    goodPunish.push(player2[i]);
                    
                } else {
                    notPunish.push(player2[i][0]);
                }
            } else { // if not whileStanding
                
                if (player2[i][1] <= ((player1[blockedMove][2] * -1)) && !(player2[i][0].startsWith('ws'))) {
                    goodPunish.push(player2[i]);
                } else {
                    notPunish.push(player2[i][0]);
                }
            }
        } else {
            notPunish.push(player2[i][0]);
        }

    };

    perfectPunish = [0, 0, 0, 0];

    console.log('---- goodPunish ----');
    // Let's find out which is the perfect punish
    for (i = (goodPunish.length - 1); i >= 0; i--) {

        // Which is the punish closest to 0 frames?
        if ((goodPunish[i][1]) > (perfectPunish[1])) {
            perfectPunish = goodPunish[i];
        } 
        
        // Whic is the punish with more damage?
        if (goodPunish[i][1] === perfectPunish[1]) {
            perfectPunish = goodPunish[i];
        } 
    };

    console.log('---- perfect punish ----');
    console.log(perfectPunish);

    // Punish options completed!
    punishOptions.push(getRandomFromArray(notPunish, 2));
    punishOptions[0].push(perfectPunish[0]);

    punishOptions = shuffle(punishOptions[0]);

    changeSource('../video/' + player1[blockedMove][0] + '.mp4');
    

    document.querySelector(DOMstrings.option1).innerHTML = punishOptions[0];
    document.querySelector(DOMstrings.option2).innerHTML = punishOptions[1];
    document.querySelector(DOMstrings.option3).innerHTML = punishOptions[2];

};

// --- Data --- //
var lili = [
    // [move, startup, onBlock, hit, damage, range, rangeOnblock, videoStop(ms)]
    ['d3+4', 17, -21, 'mid', 23, 1.5, 1.2, 0],
    ['2,4', 10, -2, 'high', 28, .5, 1.3, 0],
    ['1,2', 10, -1, 'high', 19, 1, 1.3, 0],
    ['ws2', 16, -12, 'mid', 17, 2, .8, 0],
    ['uf3', 15, -13, 'mid', 13, 1.5, .8, 0],
    ['ws1,2', 13, -3, 'mid', 31, 1.5, 1.4, 0],
    ['ws4', 11, -8, 'mid', 18, .5, 2, 0],
    ['f2,3', 12, -15, 'mid', 32, 1.5, 1.4, 0],
    ['df2', 16, -11, 'mid', 16, 2, 1, 0],
    ['Lili']
];

var kazumi = [
    ['1,1,2', 10, -17, 'mid', 25, 3, 1.5, 1000],
    ['uf4', 15, -13, 'mid', 13, 1, 1.5, 2000],
    ['df1,2', 13, -13, 'low', 31, 2.5, 1.5, 2100],
    ['df2', 18, -24, 'mid', 29, 2.5, 1.5, 1000],
    ['db4', 20, -12, 'low', 17, 1, .5, 1000],
    ['ff2', 13, -13, 'mid', 37, 2, 1, 1400],
    ['ws2', 18, -12, 'mid', 20, 1.5, 1, 1500],
    ['f3+4,2', 15, -10, 'mid', 20, 2.5, 1, 2500],
    ['f3+4,1', 19, -11, 'mid', 25, 3.5, .5, 1500],
    ['f3+4,4,2', 18, -31, 'low', 31, 3, 1, 1450],
    ['f+3+4~3+4', 19, -15, 'mid', 22, 5, 1, 1550],
    ['Kazumi']
];

function init() {
    vid = document.getElementById("my-video");

    document.querySelector(DOMstrings.option1).innerHTML = '-';
    document.querySelector(DOMstrings.option2).innerHTML = '-';
    document.querySelector(DOMstrings.option3).innerHTML = '-';
    document.querySelector(DOMstrings.alert).style.display = 'none';

    findPunish(kazumi, lili);

    document.querySelector(DOMstrings.option1).addEventListener("click", answer(DOMstrings.option1));
    document.querySelector(DOMstrings.option2).addEventListener("click", answer(DOMstrings.option2));
    document.querySelector(DOMstrings.option3).addEventListener("click", answer(DOMstrings.option3));

    document.querySelector(DOMstrings.infoPunish).style.display = 'none';

};


/*
--- Kazumi punish list ---
Burst Punch Combo -- d3+4
Lightning God's Rage -- 2,3
Wind God's Fury -- 1,2
Hellfire Burst -- ws2
Rising Mountain Kick -- uf3
Crimson Dawn -- ws1,2
Tiger wind uppercut -- d3+4
Rolling Thunder -- ws4
Crushing knee -- f2,3
Diamond Strike -- f2,3
Demon Uppercut -- f2,3
*/