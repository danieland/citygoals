///#source 1 1 /Content/javascript/ready.js
$(function () {
    SetupGame();
    SetupTransfers();
});
///#source 1 1 /Content/javascript/functions.js
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
///#source 1 1 /Content/javascript/transfers.js
function SetupTransfers() {
    var budgetElement = $('#js-budget');

    $('.js-sign').on('click', function () {
        var budget = getBudget();
        var price = $(this).data('price');

        if (price > budget) return;

        $(this).parents('.unsigned').removeClass('unsigned');
        $(this).remove();
        setBudget(budget - price);

        var playerCheck = $('.noplayers');
        if (playerCheck.length == 0) return;
        playerCheck.removeClass('noplayers');
    });

    function getBudget() {
        return budgetElement.text();
    }

    function setBudget(number) {
        budgetElement.text(number);
        Flash(budgetElement.parent());
    }
};
///#source 1 1 /Content/javascript/game.js
function SetupGame() {
    var interval = 0;

    $('#js-kickoff').on('click', function () {
        var ball = $(this);
        if (ball.data('gaming') == '1') return;

        var playerCheck = $('.noplayers');
        if (playerCheck.length == 1) return;

        SetOpponent();
        ball.data('gaming', '1');
        ball.fadeOut(function() {
            $('.commentary').fadeIn();
            SetCommentary(globalKickoff);
        });

        interval = setInterval(playGame, 1000);
    });

    function playGame() {
        var gameProgress = $('#game');
        var minuteElement = $('#minute');
        var minute = parseInt(minuteElement.text());

        if (minute < 90) {
            minute++;
            minuteElement.text(minute);
            if (minute == 1) return;
            football();
            gameProgress.val(minute);
        } else {
            clearInterval(interval);
            //show final commentary and end btn
        }
    }

    function football() {
        var isGoal = GetRandomInt(1, 100) == 21; //21 is for Silva! TODO: change ratio back
        var commentary = isGoal ? globalGoal : globalChat;
        SetCommentary(commentary);

        if (!isGoal) return;
        var goalsElement = $('#goals');
        var goals = parseInt(goalsElement.text());
        goals++;
        goalsElement.text(goals);
        Flash(goalsElement);
        Flash($('#js-commentary'));
    }
};
