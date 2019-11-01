<?php
session_start();
if (isset($_GET["deal_cards"])) {
    $_SESSION = array();
    if (!isset($_SESSION["card_deck"])) {
        $cards_array = json_decode(file_get_contents("cards.json"),true);
        shuffle($cards_array);
        $_SESSION["card_deck"] = $cards_array;
    }
    $_SESSION["dealer_cards"]["card_1"] = reset($_SESSION["card_deck"]);
    $_SESSION["used_cards"][] = reset($_SESSION["card_deck"]);
    array_shift($_SESSION["card_deck"]);
    $_SESSION["dealer_cards"]["card_2"] = reset($_SESSION["card_deck"]);
    $_SESSION["used_cards"][] = reset($_SESSION["card_deck"]);
    array_shift($_SESSION["card_deck"]);
    $_SESSION["player_cards"]["card_1"] = reset($_SESSION["card_deck"]);
    $_SESSION["used_cards"][] = reset($_SESSION["card_deck"]);
    array_shift($_SESSION["card_deck"]);
    $_SESSION["player_cards"]["card_2"] = reset($_SESSION["card_deck"]);
    $_SESSION["used_cards"][] = reset($_SESSION["card_deck"]);
    array_shift($_SESSION["card_deck"]);
    echo json_encode($_SESSION);
    exit;
}

if (isset($_GET["player_hit"])) {
    $cards_count = count($_SESSION["player_cards"]);
    $next_card = $cards_count+1;
    $_SESSION["player_cards"]["card_{$next_card}"] = reset($_SESSION["card_deck"]);
    $_SESSION["used_cards"][] = reset($_SESSION["card_deck"]);
    array_shift($_SESSION["card_deck"]);
    echo json_encode($_SESSION);

    exit;
}



if (isset($_GET["player_stick"])) {
    $_SESSION["player_sticks"] = true;
    echo json_encode($_SESSION);

    exit;
}

if (isset($_GET["dealer_draw"])) {
    $cards_count = count($_SESSION["dealer_cards"]);
    $next_card = $cards_count+1;
    $_SESSION["dealer_cards"]["card_{$next_card}"] = reset($_SESSION["card_deck"]);
    $_SESSION["used_cards"][] = reset($_SESSION["card_deck"]);
    array_shift($_SESSION["card_deck"]);
    echo json_encode($_SESSION);

    exit;
}