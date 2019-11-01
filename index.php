<?php
session_start();
// session_destroy();
// exit;
include ("functions.inc");
$cards_array = json_decode(file_get_contents("cards.json"),true);


$session_json = json_encode($_SESSION);
$init_script = "";
if (isset($_SESSION["player_cards"])) {
    $init_script = <<<HTML
    <script>
        loadCards({$session_json});
        disable_btn(".deal_btn");
        enable_btn(".stick_btn");
        enable_btn(".hit_btn");
        getCardTotals({$session_json},"player_cards");
    </script>
HTML;
}

if (isset($_SESSION["player_sticks"])) {
    $init_script .= <<<HTML
    <script>
        playerStick();
    </script>
HTML;
}


$html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BlackJack</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="main.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="table">
    
        <div class="dealer_cards">
            <div class="card1"></div>
            <div class="card2"></div>
            <div class="additional_cards">
                <div class="card3"></div>
                <div class="card4"></div>
                <div class="card5"></div>
                <div class="card6"></div>
                <div class="card7"></div>
                <div class="card8"></div>
                <div class="card9"></div>
                <div class="card10"></div>
            </div>
            <div class="total_points"></div>
        </div>
        <hr>
        <div class="player_cards">
            <div class="card1"></div>
            <div class="card2"></div>
            <div class="additional_cards">
                <div class="card3"></div>
                <div class="card4"></div>
                <div class="card5"></div>
                <div class="card6"></div>
                <div class="card7"></div>
                <div class="card8"></div>
                <div class="card9"></div>
                <div class="card10"></div>
            </div>
            <div class="total_points"></div>
        </div>
    </div>
    <div class="buttons">
        <button class="deal_btn" onclick="dealCards()">Deal</button>
        <button class="hit_btn" onclick="playerHit()" disabled>Hit</button>
        <button class="stick_btn" onclick="playerStick()" disabled>Stick</button>
        
    </div>
    <div class="messages"></div>
    
    {$init_script}
    

</body>
</html>

HTML;
echo $html;
// echo "<pre>"; print_r($_SESSION); echo "</pre>";



