const phoneNumber = "1234567890"; // Replace with the logged-in user's phone number

// Fetch user data and populate fields
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`http://localhost:3000/user/${phoneNumber}`);
    const result = await response.json();

    if (result.success) {
      const user = result.data;
      document.getElementById("name").value = user.name || "";
      document.getElementById("phone number").value = user.phoneNumber || "";
      document.getElementById("Email").value = user.email || "";
      document.getElementById("age").value = user.age || "";
      document.getElementById("location").value = user.location || "";
    } else {
      alert(result.message || "Failed to fetch user data.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("An error occurred while fetching user data.");
  }
});

// Save user changes
document.getElementById("save-button").addEventListener("click", async () => {
  const updatedData = {
    name: document.getElementById("name").value,
    phoneNumber: document.getElementById("phone number").value,
    email: document.getElementById("Email").value,
    age: document.getElementById("age").value,
    location: document.getElementById("location").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch(`http://localhost:3000/user/${updatedData.phoneNumber}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    if (result.success) {
      alert("Your changes have been saved!");
    } else {
      alert(result.message || "Failed to save changes.");
    }
  } catch (error) {
    console.error("Error saving changes:", error);
    alert("An error occurred while saving changes.");
  }
});
