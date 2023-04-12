import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user exists
        const exisitingUser = await User.findOne({ email });

        if (!exisitingUser) return res.status(404).json({ message: "User doesn't exist." });
        
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, exisitingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        // email and password is correct. sign in the user.
        const token = jwt.sign({ email: exisitingUser.email, id: exisitingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: exisitingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword  } = req.body;

    try {
        // check if user already exists
        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) return res.status(400).json({ message: "User already exists." });

        // check that password and confirmPassword are the same
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });

        // input is good. create user.
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token }); 
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}