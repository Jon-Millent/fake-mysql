const faker = require('faker');
const school = require('./school')
const Chance = require('chance');
const Attach = require('./attach');
const chance = new Chance();


class Mock {

    constructor(config) {
        this.config = Object.assign({
            local: 'zh_CN'
        }, config)


        faker.locale = this.config.local;
    }


    computed(item, input) {
        let target = input[item]
        let keyParse = ''
        let keyStr = ''
        let isOpenFilter = false
        let outputString = ''

        if(typeof target === 'object') {
            keyStr = target.type
            keyParse = keyStr.split('.')
            isOpenFilter = true
        } else {
            keyStr = target
            keyParse = target.split('.')
        }

        if(keyParse.length !== 2) {
            throw new Error('不支持的数据类型：' + keyParse)
        }


        switch (keyStr) {
            case 'attach.school':
                // 附加1 学校
                outputString = school.getSchool()
                break
            case 'attach.integer':
                // 附加2 范围内的整数数字
                if(isOpenFilter) {
                    let f = {}
                    if(typeof target.max === 'number') {
                        f.max = target.max
                    }
                    if(typeof target.min === 'number') {
                        f.min = target.min
                    }
                    outputString = chance.integer(f)
                } else {
                    outputString = chance.integer()
                }
                break
            case 'attach.floating':
                // 附加3 范围内的小数
                if(isOpenFilter) {
                    let f = {}
                    if(typeof target.max === 'number') {
                        f.max = target.max
                    }
                    if(typeof target.min === 'number') {
                        f.min = target.min
                    }
                    if(typeof target.fixed === 'number') {
                        f.fixed = target.fixed
                    }
                    outputString = chance.floating(f)
                } else {
                    outputString = chance.floating()
                }
                break
            case 'attach.string':
                // 附加3 范围内的字符串
                if(isOpenFilter) {
                    let f = {}
                    if(typeof target.max === 'number') {
                        f.max = target.max
                    }
                    if(typeof target.min === 'number') {
                        f.min = target.min
                    }

                    outputString = chance.string({length: chance.integer({min: f.min || 10, max: f.max || 50})})
                } else {
                    outputString = chance.string({length: chance.integer({min: 10, max: 50})})
                }
                break
            case 'attach.age':
                if(isOpenFilter) {
                    let f = {}
                    if(typeof target.max === 'number') {
                        f.max = target.max
                    }
                    if(typeof target.min === 'number') {
                        f.min = target.min
                    }
                    if(typeof target.fixed === 'number') {
                        f.fixed = target.fixed
                    }
                    outputString = chance.integer(f)
                } else {
                    outputString = chance.integer({min: 17, max: 28})
                }

                break
            case 'attach.phone':
                outputString = Attach.phone()
                break
            case 'attach.email':
                outputString = Attach.email()
                break
            case 'attach.qq':
                outputString = Attach.qqNumber()
                break
            case 'attach.name':
                outputString = (faker.name.findName()).replace(/\s+/g,"")
                break
            case 'attach.openid':
                outputString = Attach.openId()
                break
            case 'attach.unionid':
                outputString = Attach.unionId()
                break
            case 'attach.datetime':
                outputString = Attach.datetime('YYYY-MM-DD HH:mm:ss')
                break
            case 'attach.date':
                outputString = Attach.datetime('YYYY-MM-DD')
                break
            case 'attach.time':
                outputString = Attach.datetime('HH:mm:ss')
                break
            case 'attach.year':
                outputString = Attach.datetime('YYYY')
                break
            case 'attach.avatar':
                outputString = Attach.avatar()
                break
            case 'attach.qrcode':
                outputString = Attach.qrcode()
                break
            case 'attach.music':
                outputString = Attach.music()
                break
            default:
                if(faker[keyParse[0]] && faker[keyParse[0]][keyParse[1]]) {
                    outputString = faker[keyParse[0]][keyParse[1]]()
                }
        }





        if( isOpenFilter ) {
            // 用户自定义

            if(typeof target.maxLength === 'number') {
                outputString = outputString.substr(0, target.maxLength)
            }

            if(typeof target.required === 'boolean' && target.required === false) {
                // 50% 的几率为空
                let isEmpty = chance.bool();
                if(!isEmpty) {
                    outputString = ''
                }
            }

            if(target.filter && typeof target.filter === 'function') {
                try {
                    outputString = target.filter(outputString)
                } catch (e) {
                    throw new Error(e)
                }
            }

        }

        return outputString

    }

    generate(input = {}) {

        let outputJson = {}

        for(let item in input) {

            outputJson[item] = this.computed(item, input)

        }

        return outputJson

    }

}

module.exports = Mock
