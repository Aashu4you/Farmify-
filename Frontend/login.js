document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the user input
    const phoneNumber = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send the login request to the backend
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If the login is successful, redirect to HomePage
            window.location.href = 'HomePage.html';
        } else {
            // If login fails, show an error message
            alert(data.message);  // Show error message from backend
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
