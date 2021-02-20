const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Size = require('../models/ConeSize')
const router = Router()

router.post('/values',
    [
        check('h', 'Некорректный тип данных').isNumeric().isLength({max: 4}),
        check('r1', 'Некорректный тип данных').isNumeric().isLength({max: 4}),
        check('r2', 'Некорректный тип данных').isNumeric().isLength({max: 4})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные'
            })
        }

        const {h, r1, r2} = req.body
        const size = new Size({h, r1, r2})

        const isHaveSize = await Size.findOne({})

        if (!!isHaveSize) {
            await Size.updateOne({}, req.body)
        } else await size.save()

        res.status(201).json({message: 'Данные получены'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так.'})
    }
})

router.get('/values',
    async (req, res) => {
        try {
            const getSize = await Size.findOne({})
            res.json(getSize)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так.'})
        }
    })

module.exports = router