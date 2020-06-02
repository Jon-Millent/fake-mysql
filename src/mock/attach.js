
const Chance = require('chance');
const faker = require('faker');
const dayjs = require('dayjs');

const chance = new Chance();

class Attach {
    static phone() {
        let fStr = '3456789'
        return `1${fStr[chance.integer({min: 0, max: fStr.length-1})]}${chance.string({ length: 9, pool: '123456789' })}`
    }

    static qqNumber() {
        let qqPull = { pool: '0123456789', $: '123456789' }
        return qqPull.$[chance.integer({min: 0, max: qqPull.$.length - 1})]
                +
               chance.string({ pool: qqPull.pool,  length: chance.integer({min: 5, max: 11})})
    }

    static email(){

        let enPull = { pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }
        let outputEmail = ''
        let emailSub = [
            'gmail.com',
            '126.com',
            'qq.com',
            '163.com',
            'yahoo.com',
            'hotmail.com',
            'foxmail.com',
        ]

        let target = emailSub[chance.integer({min: 0, max: emailSub.length - 1})]

        if(target.indexOf('qq.com') !== -1) {
            outputEmail = Attach.qqNumber()
        } else {
            outputEmail = chance.string({ pool: enPull.pool,  length: chance.integer({min: 5, max: 12})})
        }

        return outputEmail.toLowerCase() + '@' + target

    }

    static openId() {
        let pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
        return 'oUkZ' + chance.string({ pool: pool,  length: 24})
    }
    static unionId() {
        let pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
        return 'oPuZ' + chance.string({ pool: pool,  length: 25})
    }

    static datetime(format) {
        return dayjs(faker.date.recent()).format(format)
    }

    static timestamp() {
        return dayjs(faker.date.recent()).valueOf()
    }

    static avatar(){
        return 'http://api.btstu.cn/sjtx/api.php?lx=c1&format=images?t=' + chance.string({length: 10})
    }

    static qrcode(){
        return 'http://api.btstu.cn/qrcode/api.php?text=https://api.btstu.cn&size=300&text' + chance.string({length: 10})
    }

    static music(){
        return 'http://api.btstu.cn/wyy/api.php?id=' + chance.integer({min: 190000, max: 200000} )
    }
}

module.exports = Attach
