import { User } from '../models/Users.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../config/jwt.js'

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
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)
        if(!isMatch){
            res.status(400).json({message: "Invalid credentials"})
        }

        const token = await generateToken(existingUser)

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                username: existingUser.username,
                email: existingUser.email,
                userId: existingUser._id
            }
        })


    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }

}