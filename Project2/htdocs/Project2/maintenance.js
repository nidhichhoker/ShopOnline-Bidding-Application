// Function to process auction items by making an AJAX request to 'maintenance.php'
function processAuctionItems() {
    var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open('GET', 'maintenance.php', true); // Open a GET request to 'maintenance.php' asynchronously

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set the request header

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // Check if the request is complete and successful (status 200)
            document.getElementById('message').innerHTML = ""; // Clear the 'message' element's content
            document.getElementById('message').innerHTML = xhr.responseText; // Set 'message' element's content to the response text
            window.alert(xhr.responseText); // Display the response text in an alert
        }
    };

    xhr.send(); // Send the request
}

// Function to generate a report by making an AJAX request to 'generateReport.php'
function generateReport() {
    const remove = document.getElementById("removeitems"); // Get the 'removeitems' element
    remove.style.display = 'block'; // Set the 'removeitems' element to be visible
    var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open("GET", "generateReport.php", true); // Open a GET request to 'generateReport.php' asynchronously

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) { // Check if the request is complete and successful (status 200)
            document.getElementById("results").innerHTML = xhr.responseText; // Set 'results' element's content to the response text
        }
    };

    xhr.send(); // Send the request
}

// Function to remove sold and failed items by making an AJAX request to 'removeItems.php'
function removeSoldAndFailedItems() {
    var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
    xhr.open("GET", "removeItems.php", true); // Open a GET request to 'removeItems.php' asynchronously

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) { // Check if the request is complete and successful (status 200)
            alert(xhr.responseText); // Display the result of the removal operation in an alert
            location.reload(); // Reload the current page
        }
    };

    xhr.send(); // Send the request
}
