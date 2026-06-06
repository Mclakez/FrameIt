import express from 'express'
import { signup, login } from '../controllers/authControllers.js'
import passport from 'passport'
import { generateToken } from '../config/jwt.js'
export const authRouter = express.Router()


authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false}))
authRouter.get('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/'}),
async (req, res) => {
        try {
            const user = req.user
            const token = await generateToken(user)
            console.log('Google token:', token)
             res.redirect(`http://localhost:5173/auth-success?token=${token}`)
        } catch (error) {
            console.error('Google callback error:', error)
             res.redirect('http://localhost:5173/login?error=auth_failed')
        }
    })