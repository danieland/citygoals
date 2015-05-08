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