const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

// REGISTER USER
router.post('/register', async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json('User not found')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json('Wrong password')

        const { password, isAdmin, ...otherDetails } = user._doc

        res.status(200).json(otherDetails)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router