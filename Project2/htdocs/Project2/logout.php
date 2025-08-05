<?php
// Start or resume the session
session_start();

 

if (isset($_SESSION['customerID'])) {
    // Unset all session variables
    $_SESSION = array();

 

    // Destroy the session
    session_destroy();

 

    // Clear the session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }

 

    // Clear any other cookies you may have set
    setcookie("custom_cookie_name", "", time() - 3600);

 

    // Clear the cache
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

 

    // Redirect to the login page or any other appropriate page
    header("Location: login.htm"); // Replace with the appropriate URL
    exit();
} else {
    // User is not logged in, nothing to do
    header("Location: login.htm"); // Redirect to login page
    exit();
}
?>