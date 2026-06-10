import express from 'express'
import { signup, login, authPage, logout } from '../controllers/authControllers.js'
import passport from 'passport'
import { generateToken } from '../config/jwt.js'
export const authRouter = express.Router()


authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get('/me', authPage)
authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false}))
authRouter.get('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/'}),
async (req, res) => {
        try {
            const user = req.user
            const token = await generateToken(user)
            console.log('Google token:', token)
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 7*24*60*60*1000
            })
             res.redirect(`http://localhost:5173/auth-success`)
        } catch (error) {
            console.error('Google callback error:', error)
             res.redirect('http://localhost:5173/login?error=auth_failed')
        }
    })