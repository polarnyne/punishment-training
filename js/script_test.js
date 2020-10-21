

// UI Controller
function playPunish() {
    var vid = document.getElementById("my-video");
    vid.currentTime = 0;     
    vid.play();

    setTimeout(function(){ 
        vid.pause();
    }
    , 5100);
};

// Processing data


var processingData = (function(){

    var DOMstrings = {
        optionsContainer: '.options',
        option1: '#q1',
        option2: '#q2',
        option3: '#q3',
        alert: '#alert',
        playBtn: '#play-button'
    },

    return {

    init = function() {
        document.querySelector(DOMstrings.option1).innerHTML = '-';
        document.querySelector(DOMstrings.option2).innerHTML = '-';
        document.querySelector(DOMstrings.option3).innerHTML = '-';
        document.querySelector(DOMstrings.alert).style.display = 'none'; 
    }};

    // var getRandomMove = function(min, max) {
    //     // function that brings a min, max number with two arguments
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
    // },

    // function findPunish(player1, player2) {
    //     // player1 attacks and player2 punish
    //     var blockedMove, goodPunish, perfectPunish, notPunish;
    
    //     goodPunish = new Array;
    //     notPunish = new Array;
    
    //     // gets a random move
    //     // blockedMove = getRandomMove(1, player1.length);
    
    //     // get a particular move
    //     blockedMove = 0;
    
    //     console.log(player1[blockedMove]);
    //     console.log()    
    //     for (var i = 0; i < player2.length; i++) {
    //         if (player1[blockedMove][3] === 'low') {
    //             // Let's check if the attack is low and should be punished with a while standing move
    //             if (player2[i][1] <= ((player1[blockedMove][2] * -1)) && player2[i][0].startsWith('ws')) {
    //                 goodPunish.push(player2[i][1]);
    //                 console.log('punish! -- ' + player2[i])
                    
    //             } else {
    //                 notPunish.push(player2[i]);
    //                 console.log('not punish! -- ' + player2[i])
    //             }
    //         } else { // if not whileStanding
    //             if (player2[i][1] <= ((player1[blockedMove][2] * -1)) && !(player2[i][0].startsWith('ws'))) {
    //                 goodPunish.push(player2[i][1]);
    //             } else {
    //                 notPunish.push(player2[i]);
    //             }
    //         }
    //     };
        
    //     // Let's find the perfect punish
    //     perfectPunish = Math.max.apply(Math, goodPunish);
    
    //     console.log(goodPunish);
    //     console.log(notPunish);
    //     console.log(perfectPunish);
    // }
})();



// Data
var lili = [
    // [move, startup, onBlock, hit, videoStop(ms)]
    ['d3+4', 17, -21, 'mid', 0],
    ['2,4', 10, -2, 'high', 0],
    ['1,2', 10, -1, 'high', 0],
    ['ws2', 16, -12, 'mid', 0],
    ['uf3', 15, -13, 'mid', 0],
    ['ws1,2', 13, -12, 'mid', 0],
    ['ws4', 11, -8, 'mid', 0],
    ['ff2', 18, -17, 'mid', 0],
    ['f2,3', 12, -15, 'mid', 0],
    ['df2', 16, -10, 'mid', 0]
];

var kazumi = [
    ['1,1,2', 10, -17, 'mid',1000],
    ['uf3', 28, -12, 'mid', 2000],
    ['df1,2', 13, -13, 'low', 2100],
    ['df2', 18, -24, 'mid', 1000],
    ['db4', 20, -12, 'low', 1000],
    ['ff2', 13, -13, 'mid', 1400],
    ['ws2', 18, -12, 'mid', 1500],
    ['f3+4,1', 36, -13, 'mid', 1500],
    ['f3+4,4,2', 35, -31, 'low', 1450],
    ['f+3+4~3+4', 19, -15, 'mid', 1550]
];

// function init() {

//     document.querySelector(processingData.DOMstrings.option1).innerHTML = '-';
//     document.querySelector(processingData.DOMstrings.option2).innerHTML = '-';
//     document.querySelector(processingData.DOMstrings.option3).innerHTML = '-';
//     document.querySelector(processingData.DOMstrings.alert).style.display = 'none';
    
// };



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