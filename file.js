// Mock user registration
document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    console.log("User Registered:", { name, email, password });
    alert("Registration Successful! Check your email for verification.");
});

// User Login
document.getElementById("userLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;
    console.log("User Logged In:", { email, password });
    alert("User Login Successful!");
});

// Admin Login
document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    console.log("Admin Logged In:", { email, password });
    document.getElementById("adminInventory").style.display = "block";
    alert("Admin Login Successful!");
});

// Pizza Order
document.getElementById("pizzaForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const pizzaBase = document.getElementById("pizzaBase").value;
    const pizzaSauce = document.getElementById("pizzaSauce").value;
    const pizzaCheese = document.getElementById("pizzaCheese").value;
    const pizzaVeggies = Array.from(document.getElementById("pizzaVeggies").selectedOptions).map(option => option.value);

    console.log("Pizza Order:", { pizzaBase, pizzaSauce, pizzaCheese, pizzaVeggies });
    alert("Pizza Order Placed!");
});

// Payment Button (mock Razorpay)
document.getElementById("paymentButton").addEventListener("click", () => {
    alert("Payment Successful! Your order is being processed.");
});

// Admin Inventory Update
document.getElementById("inventoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const base = document.getElementById("inventoryBase").value;
    const sauce = document.getElementById("inventorySauce").value;
    const cheese = document.getElementById("inventoryCheese").value;
    const veggies = document.getElementById("inventoryVeggies").value;
    const meats = document.getElementById("inventoryMeats").value;
    console.log("Inventory Updated:", { base, sauce, cheese, veggies, meats });
    alert("Inventory Updated Successfully!");
    // Mock data for pizza inventory and orders
let inventory = {
    pizzaBase: 50, // initial stock
    sauce: 30,
    cheese: 40,
    veggies: 60,
    meats: 25
  };
  
  let orders = []; // Store orders in an array
  
  // Simulate sending an email (in real implementation, integrate with a back-end email service)
  function sendEmailNotification(subject, message) {
    console.log(`Email sent with subject: ${subject}`);
    console.log(`Message: ${message}`);
  }
  
  // Update inventory after order
  function updateInventory(order) {
    inventory.pizzaBase -= order.pizzaBase;
    inventory.sauce -= order.sauce;
    inventory.cheese -= order.cheese;
    inventory.veggies -= order.veggies;
    inventory.meats -= order.meats;
  
    // Check stock thresholds and send email if necessary
    if (inventory.pizzaBase < 20) {
      sendEmailNotification('Low Stock Alert', 'Pizza base stock is below 20!');
    }
  }
  
  // Order status management for Admin
  function updateOrderStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      document.getElementById(`orderStatus_${orderId}`).innerText = `Status: ${status}`;
  
      // Update the status in the user dashboard too
      if (order.userEmail) {
        alert(`User notified: Order status updated to "${status}"`);
      }
    }
  }
  
  // Admin receives the order and updates the status
  document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
  
    console.log("Admin Logged In:", { email, password });
    document.getElementById("adminOrderManagement").style.display = "block";
    alert("Admin Login Successful!");
  
    // Show all orders in the admin dashboard
    showAdminOrders();
  });
  
  // Show Admin Orders
  function showAdminOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = '';
  
    orders.forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.classList.add('order-item');
      orderDiv.innerHTML = `
        <span>Order ID: ${order.id} | ${order.userEmail} | Pizza Base: ${order.pizzaBase} | Sauce: ${order.sauce}</span>
        <span id="orderStatus_${order.id}" class="order-status">Status: ${order.status}</span>
        <button class="status-update" onclick="updateOrderStatus(${order.id}, 'In Kitchen')">In Kitchen</button>
        <button class="status-update" onclick="updateOrderStatus(${order.id}, 'Sent to Delivery')">Sent to Delivery</button>
      `;
      orderList.appendChild(orderDiv);
    });
  }
  
  // User order submission and inventory update
  document.getElementById("pizzaForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const pizzaBase = document.getElementById("pizzaBase").value;
    const pizzaSauce = document.getElementById("pizzaSauce").value;
    const pizzaCheese = document.getElementById("pizzaCheese").value;
    const pizzaVeggies = Array.from(document.getElementById("pizzaVeggies").selectedOptions).map(option => option.value);
    
    const orderId = orders.length + 1; // Generate a unique order ID
    const order = {
      id: orderId,
      pizzaBase: pizzaBase,
      sauce: pizzaSauce,
      cheese: pizzaCheese,
      veggies: pizzaVeggies.length,
      meats: pizzaVeggies.includes('Meat') ? 1 : 0, // Example for meat selection
      status: 'Order Received',
      userEmail: 'user@example.com' // Replace with actual user's email
    };
  
    orders.push(order); // Add order to the orders array
    updateInventory(order); // Update inventory based on the order
    
    console.log("Order Placed:", order);
    
    // Update user status
    document.getElementById("userOrderStatus").innerText = `Your order is being processed.`;
    
    // Admin dashboard will show updated order list
    showAdminOrders();
  });
  // Function to handle placing an order and showing the confirmation message
document.querySelectorAll("#placeOrder").forEach(button => {
    button.addEventListener("click", function() {
      // Hide the pizza varieties section (or make it optional)
      document.getElementById("dashboard").style.display = "none";
      
      // Show the order confirmation message
      document.getElementById("orderConfirmation").style.display = "block";
      
      // You can log the order for now (this can be replaced with actual order processing)
      console.log("Order placed successfully!");
    });
  });
  
});
