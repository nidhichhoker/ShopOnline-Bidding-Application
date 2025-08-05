<?php
session_start(); // Start the session if not already started

// Check if the customer ID is set in the session
if (isset($_SESSION['customerID'])) {
    $customer_id = $_SESSION['customerID'];
    
    // Output the customer ID
    echo $customer_id;
} else {
    // Handle the case where the customer ID is not set
    echo "Customer ID not found in the session.";
}
?>
