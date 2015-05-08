function SetOpponent() {
    $('#js-opponent').text(globalOpponents[Math.floor(Math.random() * globalOpponents.length)]);
}

function Flash(element) {
    element.addClass('highlight');
    setTimeout(function () {
        element.removeClass('highlight');
    }, 800);
}

function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function SetCommentary(globalArray) {
    $('#js-commentary').text('"' + globalArray[Math.floor(Math.random() * globalArray.length)] + '"');
}