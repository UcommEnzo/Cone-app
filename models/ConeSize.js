const {Schema, model} = require('mongoose')

const schema = new Schema ({
    h: {type: Number, required: true},
    r1: {type: Number, required: true},
    r2: {type: Number, required: true}
})

module.exports = model('Size', schema)