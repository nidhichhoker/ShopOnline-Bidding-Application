<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET["firstName"]) && isset($_GET["lastName"]) && isset($_GET["email"]) && isset($_GET["confirmPassword"]) && isset($_GET["password"])) {
        $firstName = $_GET["firstName"];
        $lastName = $_GET["lastName"];
        $email = $_GET["email"];
        $password = $_GET["password"];
        $confirmPassword = $_GET["confirmPassword"];

        $loginSuccess = true;

        // Define the XML file path
        $xmlfile = '../../data/customer.xml';
        
        // Create the data directory if it doesn't exist
        $dataDir = dirname($xmlfile);
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true); // Create directory recursively
        }

        // Check for existing email if file exists
        if (file_exists($xmlfile)) {
            $xml = simplexml_load_file($xmlfile);
            if ($xml !== false) {
                foreach ($xml->customer as $customer) {
                    if ((string)$customer->email === $email) {
                        $loginSuccess = false;
                        echo "<div class='alert'>
                        <span class='closebtn' onclick='closeSuccessAlert()'>&times;</span>  
                        Email address already exists.
                        </div>"; 
                        break;
                    }
                }
            }
        }

        if ($loginSuccess) {
            $doc = new DomDocument();
            $doc->formatOutput = true;

            if (!file_exists($xmlfile)) { 
                // If the xml file does not exist, create a root node $customers
                $customers = $doc->createElement('customers');
                $doc->appendChild($customers);
            } else { 
                // Load the xml file
                $doc->preserveWhiteSpace = FALSE;
                $doc->load($xmlfile);
            }

            // Create a customer node under customers node
            $customers = $doc->getElementsByTagName('customers')->item(0);
            $customer = $doc->createElement('customer');
            $customers->appendChild($customer);

            // Generate a unique customer ID
            $customerIDValue = 'customer_' . mt_rand(1000, 9999);
           
            // Store the customerID in the session
            $_SESSION['customerID'] = $customerIDValue;

            // Create customer ID node
            $customerID = $doc->createElement('customerID');
            $customer->appendChild($customerID);
            $customerIDText = $doc->createTextNode($customerIDValue);
            $customerID->appendChild($customerIDText);

            // Create firstName node
            $FirstName = $doc->createElement('firstName');
            $customer->appendChild($FirstName);
            $firstNameValue = $doc->createTextNode($firstName);
            $FirstName->appendChild($firstNameValue);

            // Create lastName node
            $LastName = $doc->createElement('lastName');
            $customer->appendChild($LastName);
            $lastNameValue = $doc->createTextNode($lastName);
            $LastName->appendChild($lastNameValue);

            // Create email node
            $Email = $doc->createElement('email');
            $customer->appendChild($Email);
            $emailValue = $doc->createTextNode($email);
            $Email->appendChild($emailValue);

            // Create password node
            $Password = $doc->createElement('password');
            $customer->appendChild($Password);
            $passwordValue = $doc->createTextNode($password);
            $Password->appendChild($passwordValue);

            // Create confirmPassword node
            $ConfirmPassword = $doc->createElement('confirmPassword');
            $customer->appendChild($ConfirmPassword);
            $confirmPasswordValue = $doc->createTextNode($confirmPassword);
            $ConfirmPassword->appendChild($confirmPasswordValue);

            // Save the xml file
            if ($doc->save($xmlfile)) {
                echo "<div class='alert success'>
                <span class='closebtn' onclick='closeSuccessAlert()'>&times;</span>  
                Dear <strong>$firstName,</strong> you have successfully registered! Your customer ID is: <strong>$customerIDValue</strong>
                </div>";
            } else {
                echo "<div class='alert'>
                        <span class='closebtn'>&times;</span>  
                        Error while saving registration data.
                    </div>";
            }
        }
    } else {
        echo "<div class='alert'>
                <span class='closebtn'>&times;</span>  
                Missing required fields.
            </div>";
    }
} else {
    echo "<div class='alert'>
            <span class='closebtn'>&times;</span>  
            Invalid request method.
        </div>";
}
?>