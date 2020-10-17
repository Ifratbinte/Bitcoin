<?php

// some security, don't allow just anybody to check exchangerates however they want.
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) != $_SERVER['HTTP_HOST']) {
	die('Denied. Use http://download.finance.yahoo.com/d/quotes.csv?s=[from][to]=X&f=l1');
}

header('Content-Type: text/plain');

$amount = $_GET['amount'];
$source_currency = $_GET['source_currency'];
$target_currency = $_GET['target_currency'];

$ex_rate = floatval(file_get_contents('http://download.finance.yahoo.com/d/quotes.csv?s='.$source_currency.$target_currency.'=X&f=l1'));
echo round($ex_rate*$amount, 2);