<?php
try {
    // Load the XML data
    @libxml_use_internal_errors(true); // Suppress XML parsing errors

    $doc = new DOMDocument();
    $doc->preserveWhiteSpace = false;
    $doc->formatOutput = true;
    $doc->load('../../data/auction.xml'); // Update the path to your XML file.

    // Find and remove items with status "sold" or "failed"
    $xpath = new DOMXPath($doc);
    foreach ($xpath->query('//item[status="sold" or status="failed"]') as $item) {
        $item->parentNode->removeChild($item);
    }

    // Save the modified XML back to the file
    $doc->save('../../data/auction.xml'); // Update the path to your XML file.

    echo "Items with status 'sold' or 'failed' have been removed successfully.";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage(); // Display any errors that occur during the process
}
?>
