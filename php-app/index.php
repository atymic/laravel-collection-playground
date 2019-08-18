<?php
declare(strict_types=1);

use Atymic\CollectionPlayground\CollectionPlayground;

require_once 'vendor/autoload.php';

function playground(string $encodedJson, string $encodedCode)
{
    $playground = new CollectionPlayground();

    echo $playground->evaluate(rawurldecode($encodedJson), rawurldecode($encodedCode));
}
