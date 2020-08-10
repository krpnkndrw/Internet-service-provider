let { Router } = require('express')
const router = Router()
const config = require('config')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//api/auth/register
router.post('/register', async(req, res) => {
    try{
        const {login, password} = req.body
        const candidate = await User.findOne({ login })
        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ login: login, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: 'Пользователь создан' })   
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

//api/auth/login
router.post('/login', async(req, res) => {
    try {
        const {login, password} = req.body
        const user = await User.findOne({ login })
        
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
          }
      
          const isMatch = await bcrypt.compare(password, user.password)
      
          if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
          }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
    
        res.json({ token, userId: user.id })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
})

module.exports = router