<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the index and bidValue from the POST data
    $index = $_POST['index'];
    $index = intval($index); // Convert index to an integer
    $bidValue = $_POST['bidValue'];
    $sellercustomerID = $_POST['sellercustomerID'];

    // Load the XML file (auction.xml)
    $xml = simplexml_load_file('../../data/auction.xml');

    // Update the bid price for the specific item based on the index
    if (isset($xml->item[$index])) {
        $xml->item[$index]->startPrice = $bidValue;
        $xml->item[$index]->bidcustomerid = $sellercustomerID;

        // Save the updated XML back to the file
        $xml->asXML('../../data/auction.xml');

        echo 'Thank you, your bid is recorded in shopOnline to the customer.';
    } else {
        // Handle the case where the index is out of range
        echo 'Invalid index.';
    }
} else {
    // Handle the case where it's not a POST request
    echo 'Invalid request.';
}
?>
