
const Chance = require('chance');
const chance = new Chance();

class Attach {
    static phone() {
        let fStr = '3456789'
        return `1${fStr[chance.integer({min: 0, max: fStr.length-1})]}${chance.string({ length: 9, pool: '123456789' })}`
    }
}

module.exports = Attach
