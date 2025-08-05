<?php
session_start();

function displayAlert($message, $type = 'error') {
    echo "<div class='alert $type'>
            <span class='closebtn' onclick='closeAlert()'>&times;</span>  
            $message
          </div>";
}

try {
    // Check if a POST request with username and password is received
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Check if username and password parameters are provided
        if (isset($_POST['username']) && isset($_POST['password'])) {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $customerId = "";

            // Load and parse the XML file
            $xml = @simplexml_load_file('../../data/customer.xml');

            if ($xml !== false) {
                $loginSuccess = false;

                // Iterate through customers in the XML and check for a match
                foreach ($xml->customer as $customer) {
                    if ((string)$customer->email === $username && (string)$customer->password === $password) {
                        // Match found, set the loginSuccess flag to true
                        $loginSuccess = true;
                        $customerId = (string)$customer->customerID;
                        break;
                    }
                }

                // If a match is found, send a success response; otherwise, send an error response
                if ($loginSuccess) {
                    echo "<div class='alert success'>
                            <span class='closebtn' onclick='closeSuccessAlert()'>&times;</span>  
                            Login success.
                          </div>";

                    $_SESSION['customerID'] = $customerId;
                } else {
                    displayAlert("Invalid email id or password.");
                    
                }
            } else {
                displayAlert("Failed to load XML file.");
            }
        } else {
            displayAlert("Missing username or password parameters.");
        }
    } else {
        displayAlert("Invalid request method.");
    }
} catch (Exception $e) {
    // Handle any exceptions that occur during the execution of the code
    displayAlert("An error occurred: " . $e->getMessage());
}
?>
