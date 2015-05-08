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