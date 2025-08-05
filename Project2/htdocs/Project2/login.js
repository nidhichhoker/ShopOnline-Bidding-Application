function loginUser(event) {
    event.preventDefault();
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;

   var xhr = new XMLHttpRequest();
   xhr.open('POST', 'login.php', true);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
       document.getElementById('message').innerHTML="";
       
       document.getElementById('message').innerHTML = xhr.responseText;
        
       }
   };

   xhr.send('username=' + username + '&password=' + password);
}
function closeSuccessAlert() {
   // Hide the success alert
   const successAlert = document.querySelector('.alert.success');
   if (successAlert) {
       successAlert.style.display = 'none';

       // Redirect to another page
       window.location.href = 'bidding.htm'; // Change 'listing.htm' to the desired URL
   }
   
}
function closeAlert() {
    // Hide the success alert
    const successAlert = document.querySelector('.alert.success');
    if (successAlert) {
        document.getElementById('loginForm').reset();
    }
	else{
		   document.getElementById('message').innerHTML="";
           document.getElementById('loginForm').reset();
		  

	}
}


