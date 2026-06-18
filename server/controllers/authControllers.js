import { User } from '../models/Users.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../config/jwt.js'
import jwt from 'jsonwebtoken'

export async function signup(req, res) {
    const {username, email, password} = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({message: "Username is already taken"})
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(200).json({
            message: "User successfully created",
            userId: newUser._id
        })
        
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

export async function login(req, res) {
    const {username, password} = req.body

    try {
        const existingUser = await User.findOne({ username })
        if(!existingUser){
            res.status(400).json({message: "Invalid credentials"})
            return
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)
        if(!isMatch){
            res.status(400).json({message: "Invalid credentials"})
            return
        }

        const token = await generateToken(existingUser)
        res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7*24*60*60*1000
            })

        res.status(200).json({
            message: "Login successful",
            user: {
                username: existingUser.username
            }
        })


    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }

}

export async function authPage(req, res) {
    const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(user.id);
    res.json({ user: foundUser });
  } catch (err) {
    res.sendStatus(401);
  }
}

export async function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}