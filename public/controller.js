// Controller.js 
/*
Author: Bryce Mercines
Date: October 28, 2018
*/

var socket = io();

function sendKey(k){
   socket.emit("keyStroke",{key: k})
}

// directions
$("#up").click(()=>{
    sendKey("i");
});

$("#down").click(()=>{
    sendKey("k");
});

$("#left").click(()=>{
    sendKey("j");
});

$("#right").click(()=>{
    sendKey("liiiljkasxzs");
});

// movements

$("#punch").click(()=>{
    sendKey("a");
});

$("#shoot").click(()=>{
    sendKey("s");
});

$("#bomb").click(()=>{
    sendKey("z");
});

$("#misc").click(()=>{
    sendKey("x");
});

