document.addEventListener('DOMContentLoaded', function() {
    // This event listener ensures that the code inside it will run after the HTML content is fully loaded.

    function fetchCategoryDropdown() {
        // This function fetches the category dropdown options and populates them dynamically.
        const categoryDropdown = document.getElementById('category');
        const xhr = new XMLHttpRequest();
        const messageDiv = document.getElementById('message');

        // Open a GET request to fetch categories from categories.php
        xhr.open('GET', 'listing.php?action=fetchCategories', true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                // If the request is successful (status 200), parse the response as JSON.
                const categories = JSON.parse(xhr.responseText);

                // Add options to the dropdown
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category;
                    option.text = category;
                    categoryDropdown.appendChild(option);
                });

                // Add the "Other" option as the last option
                const otherOption = document.createElement('option');
                otherOption.value = 'Other';
                otherOption.text = 'Other';
                categoryDropdown.appendChild(otherOption);
            } else {
                messageDiv.textContent = 'Error fetching categories: ' + xhr.statusText;
                console.error('Error fetching categories: ' + xhr.statusText);
            }
        };

        // Send the XHR request
        xhr.send();
    }

    // Call the function to populate the category dropdown
    fetchCategoryDropdown();
});

let selectedCategory = '';

function categoryChange(select) {
    // This function is called when the category selection changes. It handles displaying the "Other" input.
    const categoryDropdown = document.getElementById('category');
    const newCategoryInput = document.getElementById('newCategory');

    if (select.value === 'Other') {
        newCategoryInput.style.display = 'block';
    } else {
        newCategoryInput.style.display = 'none';
    }
    selectedCategory = select.value;
}

function createListing() {
    // This function is called when the "Listing" button is clicked. It handles form validation and submission.
    const listingButton = document.getElementById('listingButton');
    listingButton.disabled = true;
    const itemName = document.getElementById('itemName').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const startPrice = document.getElementById('startPrice').value;
    const reservePrice = document.getElementById('reservePrice').value;
    const buyItNowPrice = document.getElementById('buyItNowPrice').value;
    const durationDays = document.getElementById('durationDays').value;
    const durationHours = document.getElementById('durationHours').value;
    const durationMinutes = document.getElementById('durationMinutes').value;
    const newCategoryInput = document.getElementById('newCategory').value;

    // Error message elements
    var itemNameError = document.getElementById("itemNameError");
    var categoryError = document.getElementById("categoryError");
    var descriptionError = document.getElementById("descriptionError");
    var startPriceError = document.getElementById("startPriceError");
    var reservePriceError = document.getElementById("reservePriceError");
    var buyItNowPriceError = document.getElementById("buyItNowPriceError");
    var durationDaysError = document.getElementById("durationDaysError");
    var durationHoursError = document.getElementById("durationHoursError");
    var durationMinutesError = document.getElementById("durationMinutesError");
    var fillOutAllDetailsError = document.getElementById("fillOutAllDetailsError");

    // Reset previous error messages
    itemNameError.textContent = "";
    categoryError.textContent = "";
    descriptionError.textContent = "";
    startPriceError.textContent = "";
    reservePriceError.textContent = "";
    buyItNowPriceError.textContent = "";
    durationDaysError.textContent = "";
    durationHoursError.textContent = "";
    durationMinutesError.textContent = "";
    fillOutAllDetailsError.textContent = "";

    let error = false;

    if (!itemName.trim()) {
        // Check if the item name is empty or only contains spaces.
        fillOutAllDetailsError.textContent = "Please fill out all the required fields and enter valid prices.";
        itemNameError.textContent = "Enter item name.";
        listingButton.disabled = false;
        error = true;
        return;
    }

    if (!category && !newCategoryInput.value) {
        // Check if neither a category nor a new category is selected/entered.
        fillOutAllDetailsError.textContent = "Please fill out all the required fields and enter valid prices.";
        categoryError.textContent = "Please choose an existing category or provide a new one.";
        listingButton.disabled = false;
        error = true;
        return;
    }

    // If "Other" is selected, use the value from the newCategory input.
    if (selectedCategory === 'Other') {
        selectedCategory = newCategoryInput;
    }

    if (startPrice > reservePrice) {
        // Check if the start price is greater than the reserve price.
        fillOutAllDetailsError.textContent = "Please fill out all the required fields and enter valid prices.";
        startPriceError.textContent = "Start price must be less than or equal to reserve price.";
        listingButton.disabled = false;
        error = true;
        return;
    }

    if (reservePrice >= buyItNowPrice) {
        // Check if the reserve price is greater than or equal to the Buy It Now price.
        fillOutAllDetailsError.textContent = "Please fill out all the required fields and enter valid prices.";
        reservePriceError.textContent = "Reserve price must be less than buy-it-now price.";
        listingButton.disabled = false;
        error = true;
        return;
    }

    if (error) {
        return; // Do not proceed with form submission
    } else {
        // Calculate the end date by adding the duration to the current date
        const currentDate = new Date();
        const endDate = new Date(
            currentDate.getTime() + durationDays * 24 * 60 * 60 * 1000 +
            durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000);

        // Format dates to "YYYY-MM-DD" format
        const formattedCurrentDate = formatDate(currentDate);
        const formattedEndDate = formatDate(endDate);

        // Create a FormData object to send the form data
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('category', selectedCategory);
        formData.append('description', description);
        formData.append('startPrice', startPrice);
        formData.append('reservePrice', reservePrice);
        formData.append('buyItNowPrice', buyItNowPrice);
        formData.append('durationDays', durationDays);
        formData.append('durationHours', durationHours);
        formData.append('durationMinutes', durationMinutes);
        formData.append('startdate', formattedCurrentDate);
        formData.append('enddate', formattedEndDate);

        // Create an XHR object
        const xhr = new XMLHttpRequest();

        // Define the PHP script URL
        const url = 'listing.php';

        // Configure the request
        xhr.open('POST', url, true);

        // Set the onload callback function
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Display the response from the server
                document.getElementById('message').innerHTML = xhr.responseText;
            } else {
                listingButton.disabled = false;
            }
        };

        // Send the FormData to the PHP script
        xhr.send(formData);
    }
}

function resetForm() {
    // This function resets the form by clearing input fields and messages.
    document.getElementById('listingForm').reset();
    listingButton.disabled = false;
    document.getElementById('message').innerHTML = '';
    location.reload();
}

// Format the date into YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Close button for alert
function closeAlert() {
    // Hide the success alert
    const successAlert = document.querySelector('.alert.success');
    if (successAlert) {
        resetForm();
    } else {
        document.getElementById('message').innerHTML = "";
        listingButton.disabled = false;
    }
}
