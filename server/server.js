const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Registration Successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});
