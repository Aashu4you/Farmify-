function sendOTP() {
    const contact = document.getElementById('contactInput').value;
    if (contact) {
        document.getElementById('otpInput').style.display = 'block';
        document.getElementById('verifyButton').style.display = 'inline-block';
        document.getElementById('statusMessage').innerText = "OTP sent to " + contact;
    } else {
        alert("Please enter your contact details.");
    }
}

function verifyOTP() {
    const otp = document.getElementById('otpInput').value;
    if (otp === "123456") { // Replace with actual backend verification
        document.getElementById('statusMessage').innerText = "OTP verified successfully!";
        document.getElementById('statusMessage').style.color = "green";
    } else {
        document.getElementById('statusMessage').innerText = "Invalid OTP. Please try again.";
        document.getElementById('statusMessage').style.color = "red";
    }
}
