<?php
// Load the XML file
$xml = simplexml_load_file('../../data/auction.xml');

// Get the current date and time
$currentDatetime = new DateTime();

// Iterate through item elements in the XML
foreach ($xml->item as $item) {
    $status = (string)$item->status;

    // Check if the auction is in progress
    if ($status === 'in_progress') {
        $auctionStartDatetime = new DateTime((string)$item->auctionStartDate);
        $auctionEndDatetime = new DateTime((string)$item->auctionEndDate);

        // Calculate time left until the auction ends
        $timeLeft = $currentDatetime->diff($auctionEndDatetime);

        // Check if the auction has ended (timeLeft is negative)
        if ($timeLeft->format('%R') === '-') {
            $startPrice = (float)$item->startPrice;
            $reservePrice = (float)$item->reservePrice;

            // Check if the start price is greater than or equal to the reserve price
            if ($startPrice >= $reservePrice) {
                // Update the status to 'sold' if it met the reserve price
                $item->status = 'sold';
            } else {
                // Update the status to 'failed' if it did not meet the reserve price
                $item->status = 'failed';
            }
        }
    }
}

// Save the modified XML back to the file
$xml->asXML('../../data/auction.xml');

// Display a completion message
echo "Processing is complete.";
?>
