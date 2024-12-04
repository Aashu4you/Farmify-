// Function to save data to local storage
function saveToLocalStorage(data) {
    let cropData = JSON.parse(localStorage.getItem('cropData')) || [];
    cropData.push(data);
    localStorage.setItem('cropData', JSON.stringify(cropData));
}

// Function to display saved data
function displaySavedData() {
    const resultDiv = document.getElementById('result');
    const cropData = JSON.parse(localStorage.getItem('cropData')) || [];
    if (cropData.length > 0) {
        resultDiv.innerHTML = '<h2>Previously Submitted Crop Details</h2>';
        cropData.forEach((data, index) => {
            resultDiv.innerHTML += `
                <div class="crop-entry">
                    <h3>Entry ${index + 1}</h3>
                    <p><strong>Crop Type:</strong> ${data.cropType}</p>
                    <p><strong>Date of Sowing:</strong> ${data.sowDate}</p>
                    <p><strong>Fertilizer Used:</strong> ${data.fertilizer}</p>
                    <p><strong>Pesticide Used:</strong> ${data.pesticide}</p>
                    <p><strong>Additional Notes:</strong> ${data.notes}</p>
                </div>
            `;
        });
    }
}

// Event listener for form submission
document.getElementById('cropForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const cropType = document.getElementById('cropType').value;
    const sowDate = document.getElementById('sowDate').value;
    const fertilizer = document.getElementById('fertilizer').value;
    const pesticide = document.getElementById('pesticide').value;
    const notes = document.getElementById('notes').value;

    const cropData = {
        cropType,
        sowDate,
        fertilizer,
        pesticide,
        notes
    };

    // Save data to local storage
    saveToLocalStorage(cropData);

     // Redirect to the previous crops page
     window.location.href = 'cropshedule.html'; 

    // Display the submitted data
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Submitted Crop Details</h2>
        <p><strong>Crop Type:</strong> ${cropType}</p>
        <p><strong>Date of Sowing:</strong> ${sowDate}</p>
        <p><strong>Fertilizer Used:</strong> ${fertilizer}</p>
        <p><strong>Pesticide Used:</strong> ${pesticide}</p>
        <p><strong>Additional Notes:</strong> ${notes}</p>
    `;

    // Optionally, reset the form after submission
    this.reset();

    // Display previously saved data
    displaySavedData();
});

document.getElementById('cropForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Redirect to the new page
    window.location.href = 'cropscheduling.html'; // Change 'newpage.html' to your desired URL
});
