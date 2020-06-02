const mysql = require('mysql2');

class Sql {

    constructor(config) {
        this.config = Object.assign({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '3306',
            timezone: '+8:00',
            database: ''
        }, config)
    }

    async createConnection() {
        this.connection = await mysql.createConnection({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            port: this.config.port,
            timezone: this.config.timezone
        });

    }

    closeSql(){
        this.connection.end()
    }


    // 扁平化值
    flatValues(valueArr){
        let str = ''
        valueArr.forEach(item=>{
            str += `"${item}",`
        })
        return str.substr(0, str.length - 1)
    }

    // 创建多条
    create (inputConfig) {

        // inputConfig.data = [{k:v}, {}, {}, {}, {}]
        let insertStr = `INSERT INTO ${inputConfig.table} `
        let keyStr = ''
        let valueStr = 'VALUES '

        inputConfig.data.forEach((item, index)=>{
            let keys = []
            let values = []
            for (let i in item) {
                keys.push(i)
                values.push(item[i])
            }

            if(keyStr === '') {
                keyStr = `(${keys.join(',')})`
            }
            valueStr += `(${this.flatValues(values)})`

            if( index < inputConfig.data.length - 1 ) {
                valueStr += ','
            }
        })

        insertStr += (keyStr + ' ' + valueStr + ';')

        return new Promise((resolve)=>{
            this.connection.query(
                insertStr,
                function(err, results, fields) {
                    if(err) {
                        resolve({
                            code: 500,
                            err: err
                        })
                    } else {
                        resolve({
                            code: 200,
                            results,
                            fields
                        })
                    }
                }
            );
        })

    }

}


module.exports = Sql
