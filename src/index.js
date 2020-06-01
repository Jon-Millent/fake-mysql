#!/usr/bin/env node

const Sql = require('./Sql')
const Mock = require('./mock/index')
const Path = require('path')
const fs = require("fs")

// 找到用户输入的配置路径
const argv = process.argv

const nowDir = process.cwd()

if(argv.length < 3) {
    console.log('Please enter the configuration file path like: fakemysql ./config.js')
    return
}



async function checkFile(path){
    return  new Promise(resolve => {
        fs.exists(path, function(exists) {
            resolve(exists)
        });
    })
}

async function main (){
    let configPath = ''

    let isAbsolute = Path.isAbsolute(argv[2])

    let startTime = new Date().getTime()

    if(isAbsolute) {
        // 是绝对路径
        configPath = argv[2]
    } else {
        // 相对路径
        configPath = Path.join(nowDir, argv[2])
    }

    let configIsExist = await checkFile(configPath)
    if(!configIsExist) {
        console.log('Configuration file does not exist')
        return
    }

    let userConfig = require(configPath)

    if(!userConfig) {
        console.log('Parsing configuration failed')
        return
    }

    let mySql = new Sql({
        host: userConfig.host,
        user: userConfig.user,
        password: userConfig.password,
        database: userConfig.database,
        port: userConfig.port,
        timezone: userConfig.timezone
    })

    await mySql.createConnection()

    let myMock = new Mock({
        local: userConfig.local
    })

    for(let i=0; i<userConfig.tables.length; i++) {
        let parent1 = userConfig.tables[i]

        let renderInfo = {
            table: parent1.name,
            data: []
        }
        for(let j=0; j<parent1.length; j++) {
            let obj = myMock.generate(parent1.data)
            renderInfo.data.push(obj)
        }

        let result = await mySql.create(renderInfo)

        if(result.code === 200) {
            console.log(result.results.info)
        } else {
            console.log(result.fields)
        }
    }

    console.log('ok ' + (new Date().getTime() - startTime) + 'ms')
    mySql.closeSql()

    process.on('SIGINT', function () {
        mySql.closeSql()
        process.exit();
    });

}

main()
