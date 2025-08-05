<?php
// Define the path to the XML file
$xmlFile = '../../data/auction.xml';

// Check if the XML file exists in the specified path
if (file_exists($xmlFile)) {
    // Set the HTTP header to indicate that the response is XML
    header('Content-Type: application/xml');
    // Output the contents of the XML file to the browser
    echo file_get_contents($xmlFile);
} else {
    // If the XML file does not exist, display an error message
    echo 'XML file not found.';
}
?>
