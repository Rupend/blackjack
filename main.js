function dealCards() {
    clearTable();
    $.ajax({
        url: "ajax.php?deal_cards",
        type: "POST",
        success: function (data, textStatus, jqXHR) {
            var json = JSON.parse(data);
            
            loadCards(json);
            disable_btn(".deal_btn");
            enable_btn(".stick_btn");
            enable_btn(".hit_btn");
            getCardTotals(json, "player_cards");
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + " " + textStatus + " " + errorThrown);
        }
    });
}

function disable_btn(btn_target) {
    $(btn_target).prop("disabled", true);
}
function enable_btn(btn_target) {
    $(btn_target).prop("disabled", false);
}

function loadCards(json) {

    $(".dealer_cards .card1").html("<img src='/cards/" + json.dealer_cards.card_1.id + ".png' />");
    $(".dealer_cards .card2").html("<img src='/cards/red_back.png' />");
    
    $(".player_cards .card1").html("<img src='/cards/" + json.player_cards.card_1.id + ".png' />");
    $(".player_cards .card2").html("<img src='/cards/" + json.player_cards.card_2.id + ".png' />");
    loadAdditionalCards(json);
}

function getCardTotals(json, target, use_alt=false) {
    var cardTotal = 0;
    var alternative_points = 0;
    var remove_points = 0;
    var alt = false;
    $.each(json[target], function (indexInArray, valueOfElement) {
        

        cardTotal = cardTotal + valueOfElement.points;
        if (valueOfElement.hasOwnProperty("alternative_points")) {
            alternative_points = alternative_points + valueOfElement.alternative_points;
            remove_points = remove_points + valueOfElement.points - alternative_points;

        }
        
    });
    
    alternative_points = cardTotal - remove_points;

    if (use_alt == true && alternative_points > 0) {
        cardTotal = alternative_points;
        $(".messages").empty();
        disable_btn(".deal_btn");
        enable_btn(".stick_btn");
        enable_btn(".hit_btn");
    }

    if (cardTotal > 0) {
        $("." + target + " .total_points").html(cardTotal);
    }
    if (alternative_points > 0 && alternative_points < cardTotal) {
        $("." + target + " .total_points").append("/"+alternative_points);
        alt = true;
    }
    var bustCheck = checkForBust(cardTotal, target, use_alt);
    if (bustCheck == "bust" && use_alt == false) {
        getCardTotals(json, target, use_alt = true);
    }

}

function playerHit() {
    $.ajax({
        url: "ajax.php?player_hit",
        type: "POST",
        success: function (data, textStatus, jqXHR) {
            var json = JSON.parse(data);
            loadAdditionalCards(json);
            

            getCardTotals(json, "player_cards");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + " " + textStatus + " " + errorThrown);
        }
    });
}

function playerStick() {
    $.ajax({
        url: "ajax.php?player_stick",
        type: "POST",
        success: function (data, textStatus, jqXHR) {
            var json = JSON.parse(data);
            dealerRevealCard(json);
            disable_btn(".stick_btn");
            disable_btn(".hit_btn");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + " " + textStatus + " " + errorThrown);
        }
    });
    
}

function loadAdditionalCards(json) {
    if (json.player_cards.hasOwnProperty("card_3")) $(".player_cards .additional_cards .card3").html("<img src='/cards/" + json.player_cards.card_3.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_4")) $(".player_cards .additional_cards .card4").html("<img src='/cards/" + json.player_cards.card_4.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_5")) $(".player_cards .additional_cards .card5").html("<img src='/cards/" + json.player_cards.card_5.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_6")) $(".player_cards .additional_cards .card6").html("<img src='/cards/" + json.player_cards.card_6.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_7")) $(".player_cards .additional_cards .card7").html("<img src='/cards/" + json.player_cards.card_7.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_8")) $(".player_cards .additional_cards .card8").html("<img src='/cards/" + json.player_cards.card_8.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_9")) $(".player_cards .additional_cards .card9").html("<img src='/cards/" + json.player_cards.card_9.id + ".png' />")
    if (json.player_cards.hasOwnProperty("card_10")) $(".player_cards .additional_cards .card10").html("<img src='/cards/" + json.player_cards.card_10.id + ".png' />")

    if (json.dealer_cards.hasOwnProperty("card_3")) $(".dealer_cards .additional_cards .card3").html("<img src='/cards/" + json.dealer_cards.card_3.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_4")) $(".dealer_cards .additional_cards .card4").html("<img src='/cards/" + json.dealer_cards.card_4.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_5")) $(".dealer_cards .additional_cards .card5").html("<img src='/cards/" + json.dealer_cards.card_5.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_6")) $(".dealer_cards .additional_cards .card6").html("<img src='/cards/" + json.dealer_cards.card_6.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_7")) $(".dealer_cards .additional_cards .card7").html("<img src='/cards/" + json.dealer_cards.card_7.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_8")) $(".dealer_cards .additional_cards .card8").html("<img src='/cards/" + json.dealer_cards.card_8.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_9")) $(".dealer_cards .additional_cards .card9").html("<img src='/cards/" + json.dealer_cards.card_9.id + ".png' />")
    if (json.dealer_cards.hasOwnProperty("card_10")) $(".dealer_cards .additional_cards .card10").html("<img src='/cards/" + json.dealer_cards.card_10.id + ".png' />")
}


function dealerRevealCard(json) {
    $(".dealer_cards .card2").html("<img src='/cards/" + json.dealer_cards.card_2.id + ".png' />");
    getCardTotals(json, "dealer_cards");
    
}

function dealerDrawCards(){
    $.ajax({
        url: "ajax.php?dealer_draw",
        type: "POST",
        success: function (data, textStatus, jqXHR) {
            var json = JSON.parse(data);
            setTimeout(function () {
                loadAdditionalCards(json);
                getCardTotals(json, "dealer_cards");
            }, 1000);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + " " + textStatus + " " + errorThrown);
        }
    });
}

function checkForBust(total, target, alt) {
    
    if (target == "player_cards") {
        var person1 = "Player";
        var person2 = "Dealer";
    }
    if (target == "dealer_cards") {
        var person1 = "Dealer";
        var person2 = "Player";
    }

    var maxTotal = 21;
    var holdTotal = 17;

    if (target == "dealer_cards" && total >= holdTotal) {
        enable_btn(".deal_btn");
        disable_btn(".stick_btn");
        disable_btn(".hit_btn");
        checkWinner();
    } 
    
    if (target == "dealer_cards" && total < holdTotal) {
        dealerDrawCards();
    }

    if (total > maxTotal) {
        $(".messages").html(person1 + " busts, " + person2 + " wins!");
        enable_btn(".deal_btn");
        disable_btn(".stick_btn");
        disable_btn(".hit_btn");
        return "bust";
    }

    if (total == maxTotal) {
        enable_btn(".deal_btn");
        disable_btn(".stick_btn");
        disable_btn(".hit_btn");
        playerStick();
        checkForBlackJack();
    }
}

function checkForBlackJack() {

}

function clearTable() {
    for (var index = 1; index <= 10; index++) {
        $(".card"+index).empty();
    }
    $(".total_points, .messages").empty()

}

function checkWinner() {
    var playerTotal = parseInt($(".player_cards .total_points").html());
    var dealerTotal = parseInt($(".dealer_cards .total_points").html());
    var msg = "";
    if (playerTotal == dealerTotal) msg = "Game is a draw";
    if (playerTotal > dealerTotal) msg = "You won the game";
    if (playerTotal < dealerTotal) msg = "You lost the game";
    $(".messages").html(msg);
}