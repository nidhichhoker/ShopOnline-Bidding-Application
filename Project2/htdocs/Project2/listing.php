<?php

// Start the session
session_start();

// Initialize the customer_id variable
$customer_id = '';

// Check if the request is for fetching categories
if (isset($_GET['action']) && $_GET['action'] === 'fetchCategories') {
    // Set the response content type to JSON
    header('Content-Type: application/json');

    // Fetch and return the unique categories as JSON
    echo json_encode(fetchCategories());
} else {
    // Check if the 'customerID' session variable is set
    if (isset($_SESSION['customerID'])) {
        $customer_id = $_SESSION['customerID'];

        // Handle the form submission
        try{   
            SellerDetails($customer_id);
           }
           catch (Exception $e) {
                echo "<div class='alert'>
     <span class='closebtn' onclick='closeAlert()'>&times;</span>  
                         Invalid Request.
     </div>"; 
     
           }
    } else {
        // Display an alert if the session is not set
        echo "<div class='alert'>
                    <span class='closebtn' onclick='closeAlert()'>&times;</span>  
                    Session Failed! You must login with ID
                </div>";
    }
}

// Function to fetch categories from an XML file
function fetchCategories() {
    $xmlFile = '../../data/auction.xml'; // Update the file path

    if (file_exists($xmlFile)) {
        $categories = [];
        $xml = simplexml_load_file($xmlFile);

        // Iterate through the XML and collect unique categories
        foreach ($xml->item as $item) {
            $category = (string) $item->category;
            if (!in_array($category, $categories)) {
                $categories[] = $category;
            }
        }

        return $categories;
    }

    return [];
}

// Function to generate a unique item number
function generateUniqueItemNumber() {
    return 'item_' . mt_rand(1000, 9999); // Using a unique identifier for simplicity
}

// Function to validate form inputs (you can add more validation logic)
function validateInputs($itemName, $category, $description, $reservePrice, $buyItNowPrice) {
    if (empty($itemName) || empty($category) || empty($description) || !is_numeric($reservePrice) || !is_numeric($buyItNowPrice)) {
        return false;
    }
    return true;
}

// Function to handle the submission of seller details
function SellerDetails($customer_id) {
    // Check if the form was submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Retrieve form data
        $itemName = $_POST['itemName'];
        $category = $_POST['category'];
        $description = $_POST['description'];
        $startPrice = $_POST['startPrice'];
        $reservePrice = $_POST['reservePrice'];
        $buyItNowPrice = $_POST['buyItNowPrice'];
        $durationDays = $_POST['durationDays'];
        $durationHours = $_POST['durationHours'];
        $durationMinutes = $_POST['durationMinutes'];
        $auctionStartDate = $_POST['startdate'];
        $auctionEndDate = $_POST['enddate'];

        // Validate inputs
        if (!validateInputs($itemName, $category, $description, $reservePrice, $buyItNowPrice)) {
            echo "Invalid input data. Please check the input fields.";
            exit;
        }

        // Generate a unique item number
        $itemNumber = 'item' . mt_rand(1000, 9999);

        // Prepare system-generated information
        $status = 'in_progress';

        // Load or create the auction.xml document
        $auctionFile = '../../data/auction.xml'; // Update the file path

        if (file_exists($auctionFile)) {
            $doc = new DOMDocument();
            $doc->preserveWhiteSpace = false;
            $doc->formatOutput = true;

            $doc->load($auctionFile);
            $auction = $doc->documentElement;
        } else {
            $doc = new DOMDocument('1.0');
            $auction = $doc->createElement('auction');
            $doc->appendChild($auction);
        }
        $startPrice = 0; // Default start price

        // Add the new item listing to the document
        $item = $doc->createElement('item');
        $auction->appendChild($item);

        $item->appendChild($doc->createElement('itemNumber', $itemNumber));
        $item->appendChild($doc->createElement('sellercustomerid', $customer_id));
        $item->appendChild($doc->createElement('itemName', $itemName));
        $item->appendChild($doc->createElement('category', $category));
        $item->appendChild($doc->createElement('description', $description));
        $item->appendChild($doc->createElement('reservePrice', $reservePrice));
        $item->appendChild($doc->createElement('buyItNowPrice', $buyItNowPrice));
        $item->appendChild($doc->createElement('startPrice', $startPrice));
        $item->appendChild($doc->createElement('auctionStartDate', $auctionStartDate));
        $item->appendChild($doc->createElement('auctionEndDate', $auctionEndDate));
        $item->appendChild($doc->createElement('bidcustomerid', $customer_id));
        $item->appendChild($doc->createElement('currentBidPrice', $startPrice));
        $item->appendChild($doc->createElement('status', $status));
        $item->appendChild($doc->createElement('durationDays', $durationDays));
		$item->appendChild($doc->createElement('durationHours', $durationHours));
		$item->appendChild($doc->createElement('durationMinutes', $durationMinutes));

        // Save the updated XML document
        $doc->formatOutput = true;
        $doc->save($auctionFile);

        // Provide feedback to the seller
        echo "<div class='alert success'>
                <span class='closebtn' onclick='closeAlert()'>&times;</span>  
                Item has been successfully listed for auction.
            </div>";
    } else {
        // Display an alert for an invalid request
        echo "<div class='alert'>
        <span class='closebtn' onclick='closeAlert()'>&times; </span>  
        Invalid Request !
    </div>";
    }
}
?>
