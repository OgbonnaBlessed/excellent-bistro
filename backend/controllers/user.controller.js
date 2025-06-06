import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import validator from 'validator';

// LOGIN FUNCTION
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error logging in user" })
    }
}

// CREATE A TOKEN
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
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
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error registering user" });
    }
}