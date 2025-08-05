function fetchAuctionData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'bidding.php', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var responseXML = xhr.responseXML;
      var items = responseXML.querySelectorAll('item');

      if (items.length > 0) {
        var auctionItems = document.getElementById('auctionItems');
        auctionItems.innerHTML = ''; // Clear existing content

        items.forEach(function (item, index) {
          var itemDiv = document.createElement('div');
          itemDiv.className = 'item';

          const endDateTime = item.querySelector('auctionEndDate').textContent;
          let timeRemaining = calculateTimeRemaining(endDateTime);

          const buyItNowPrice = item.querySelector('buyItNowPrice').textContent;
          const customerId = item.querySelector('sellercustomerid').textContent;
          const item_number = item.querySelector('itemNumber').textContent;
          const status = item.querySelector('status').textContent;
          const startPrice = item.querySelector('startPrice').textContent;
          const reservePrice = item.querySelector('reservePrice').textContent;
          const bidcustomerid = item.querySelector('bidcustomerid').textContent;
          

          const sellercustomerID =customerIdVariable;


          
         

         
    


          const bidButtonDisabled = status === 'sold' ? 'disabled' : '';
          const buyNowButtonDisabled = status === 'sold' ? 'disabled' : '';

       

          
       
          let soldLabelDisabled = '';

          if (status === 'sold') {
            soldLabelDisabled = 'inline';
          } else {
            soldLabelDisabled = 'none';
          }
          
        


          const timerDiv = document.createElement('div');
          timerDiv.className = 'timer';
          timerDiv.style.color = 'green';

          function updateTimer() {
            timeRemaining -= 1000; // Subtract 1 second
            if (timeRemaining < 0) {
              clearInterval(timerInterval); // Stop the timer when it reaches zero
              timerDiv.innerHTML = 'Auction has ended';

               
              timerDiv.style.color = 'red';
              var button1 = document.getElementById(`placeBid${index}`);
              button1.disabled = true;
              var button2 = document.getElementById(`buyItNow${index}`);
              button2.disabled = true;
           
              
            } else {
              const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
              const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
              timerDiv.innerHTML = `Time Left: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
            }
          }
         
          

          // Set up an interval to update the timer every second
          const timerInterval = setInterval(updateTimer, 1000);

          itemDiv.innerHTML = `
            <label for="itemNo">Item No:</label>
            <span>${item.querySelector('itemNumber').textContent}</span><br>
            <div><br></div>
            <label for="ItemName">Item Name:</label>
            <span>${item.querySelector('itemName').textContent}</span><br>
            <div><br></div>
            <label for="category">Category:</label>
            <span>${item.querySelector('category').textContent}</span><br>
            <div><br></div>
            <label for="description">Description:</label>
            <span>${item.querySelector('description').textContent}</span><br>
            <div><br></div>
            <label for="buyItNowPrice">Buy It Now Price:</label>
            <span>${item.querySelector('buyItNowPrice').textContent}</span><br>
            <div><br></div>
            <label for="bidPrice">Bid Price:</label>
            <span>${item.querySelector('startPrice').textContent}</span><br>
            <div><br></div>
            

            <button id= "placeBid${index}" onclick="showBidDialog(${index}, '${startPrice}', '${reservePrice}', '${sellercustomerID}')" ${bidButtonDisabled}>Place Bid</button>
            <button  id= "buyItNow${index}" onclick="buyItNow(${index},'${customerId}', '${sellercustomerID}')" ${buyNowButtonDisabled}>Buy It Now</button><br><br>

            
 
<label for="sold" id="soldLabel${index}" style="display: ${soldLabelDisabled}; color: red;">Item Sold</label>




      

            



          `;
          

          itemDiv.appendChild(timerDiv);
          auctionItems.appendChild(itemDiv);
          if (status === 'sold') {
            timerDiv.style.display = 'none';
          }
        });
      }
    }
  };
  xhr.send();
}


function buyItNow(index, customerId, sellercustomerID)
{



  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'updateBuyItNow.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      
      alert(xhr.responseText); 
    }
  };


  xhr.send('index=' + index + '&customerId=' + customerId + '&sellercustomerID=' + sellercustomerID);
  
}








function showBidDialog(index, startPrice, reservePrice ,sellercustomerID) {
  var bidAmount = prompt('Enter your bid amount:');


  if (bidAmount !== null) 
  {
    var bidValue = parseFloat(bidAmount);
    if (!isNaN(bidValue)) 
    {
      if(startPrice >= bidValue || reservePrice > bidValue)
      {
        alert('Sorry, your bid is not valid to the customer');

      }


      else
      {

      updateBidOnServer(index, bidValue, sellercustomerID);
      }
    } 
    else 
    {
      alert('Invalid bid amount. Please enter a valid number.');
    }
  }
}

function calculateTimeRemaining(endDateTime) {
  const endTime = new Date(endDateTime).getTime();
  const now = new Date().getTime();
  const timeRemaining = endTime - now;

  return timeRemaining > 0 ? timeRemaining : 0;
}

function updateBidOnServer(index, bidValue, sellercustomerID) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'updateAuction.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response from the server, if needed
      alert(xhr.responseText); // You can replace this with your own handling logic
    }
  };



  xhr.send('index=' + index + '&bidValue=' + bidValue + '&sellercustomerID=' + sellercustomerID);
}
  

function fetchCustomerId(callback)
{
  var xhr = new XMLHttpRequest();
        xhr.open("GET", "fetchCustomerId.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var customerId = xhr.responseText;
               
                if (callback) {
                  callback(customerId);
              }
            }
        };
        xhr.send();
}
var customerIdVariable; // Declare a variable to store the result

fetchCustomerId(function (customerId) {
  // This function will be called when the customerId is available
  customerIdVariable = customerId; // Store the value in the variable

});


