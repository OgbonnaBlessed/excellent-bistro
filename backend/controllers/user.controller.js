import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import validator from 'validator';

// CREATE A TOKEN
const createToken = (id, rememberMe = false) => {
    const expiresIn = rememberMe ? '30d' : '7d';
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
}

// REGISTER FUNCTION
export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "user already exists" })
        }

        // VALIDATION
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a strong password" });
        }

        // IF EVERYTHING WORKS
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // NEW USER
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword,
            isAdmin: false
        });

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, user, token, message: "sign up successful" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error registering user" });
    }
}

// LOGIN FUNCTION
export const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body

    try {
        if (!email || !password) {
            return res.json({ success: false, message: "kindly fill all fields"});
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        const token = createToken(user._id, rememberMe);
        res.json({ success: true, user, token, message: "log in successful" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error logging in user" })
    }
}