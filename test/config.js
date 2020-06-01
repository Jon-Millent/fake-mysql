module.exports = {

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'school',
    port: '3306',

    local: 'zh_CN',
    tables: [
        {
            name: 'stu',
            length: 100,
            data: {
                name: {
                    maxLength: 30,
                    required: false,
                    key: 'name.findName',
                    filter(target){
                        return target + '你好'
                    }
                },
                ip: 'internet.ip',
                image: 'image.image',
                city: 'address.city',
                school: 'attach.school',
            }
        }
    ]

}
