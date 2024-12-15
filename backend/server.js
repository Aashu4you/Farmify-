import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url'; // Import this to get the __dirname equivalent

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'Frontend' directory
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define the User model
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    phoneNumber: { type: String, unique: true },
    age: Number,
    location: String,
    password: String,
}));

// Define the Contact model
const Contact = mongoose.model('Contact', new mongoose.Schema({
    name: String,
    email: String,
    message: String,
}));

// POST route to handle account creation
app.post("/create-account", async (req, res) => {
    const { name, phoneNumber, age, location, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        // Check if phone number already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).send("This phone number is already registered.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            name,
            phoneNumber,
            age,
            location,
            password: hashedPassword,
        });

        // Save user in the database
        await newUser.save();
        return res.status(200).send("Account created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// POST route to handle login
app.post("/login", async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        // Find user by phone number
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        // If authentication is successful
        return res.status(200).json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// GET route to fetch user details
app.get("/account-details/:phoneNumber", async (req, res) => {
    const { phoneNumber } = req.params;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// PUT route to update user details
app.put("/update-account/:phoneNumber", async (req, res) => {
    const { phoneNumber } = req.params;
    const { name, age, location, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (password) {
            // Hash the new password if provided
            user.password = await bcrypt.hash(password, 10);
        }

        // Update other fields
        user.name = name || user.name;
        user.age = age || user.age;
        user.location = location || user.location;

        await user.save();
        res.status(200).send("Account updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// POST route to handle contact form submissions
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).send("Message received successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

// Serve the homepage or other static routes
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log("Your website is hosted at http://localhost:3000");
});
