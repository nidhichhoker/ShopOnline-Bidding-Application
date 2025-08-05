<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the data from the POST request
    $index = $_POST['index'];
    $index = intval($index); // Convert index to an integer
    $customerId = $_POST['customerId'];
    $sellercustomerID = $_POST['sellercustomerID'];

    // Load the XML file
    $xml = simplexml_load_file('../../data/auction.xml');

    // Check if the item at the specified index exists
    if (isset($xml->item[$index])) {
        // Update item properties
        $xml->item[$index]->startPrice = $xml->item[$index]->buyItNowPrice;
        $xml->item[$index]->status = 'sold';
        $xml->item[$index]->bidcustomerid = $sellercustomerID;

        // Save the updated XML back to the file
        $xml->asXML('../../data/auction.xml');

        // Provide a success message
        echo 'Thank you, your bid is recorded in shopOnline to the customer.';
    } else {
        // Handle the case of an invalid index
        echo 'Invalid index.';
    }
} else {
    // Handle invalid requests that are not POST
    echo 'Invalid request.';
}
?>
