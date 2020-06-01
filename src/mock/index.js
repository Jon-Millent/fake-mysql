const faker = require('faker');
const school = require('./school')
const Chance = require('chance');
const Attach = require('./attach');
const chance = new Chance();
const _trim = require('lodash/trim');


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
            throw new Error('不支持的数据类型')
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
                // 附加2 范围内的整数数字
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
            case 'attach.age':
                outputString = chance.integer({min: 1, max: 150})
                break
            case 'attach.phone':
                outputString = Attach.phone()
            case 'attach.name':
                outputString = (faker.name.findName()).replace(/\s+/g,"")
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
