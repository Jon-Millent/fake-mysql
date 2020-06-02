module.exports = {

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'school',
    local: 'zh_CN',
    port: '3306',

    mode: 'dev',

    tables: [
        {
            name: 'stu',
            length: 10,
            data: {
                name: {
                    maxLength: 20,
                    required: false,
                    type: 'name.findName',
                    filter(target){
                        return target + '你好'
                    }
                },
                nickname: 'attach.name',
                age: 'attach.age',
                class_num: {
                    type: 'attach.integer',
                    min: 50,
                    max: 80
                },
                score: {
                    type: 'attach.floating',
                    min: 50,
                    max: 100
                },
                phone: 'attach.phone',
                email: 'attach.email',
                ip: 'internet.ip',
                school: 'attach.school',
                address: 'address.city',
                create_time: 'attach.datetime',
                content: {
                    type: 'custom.content',
                    filter(){
                        return '123456789'
                    }
                },
                news: {
                    type: 'attach.string',
                    min: 100,
                    max: 200
                },
                avatar: 'attach.avatar',
                music: 'attach.music',
                qrcode: 'attach.qrcode',
            }
        }
    ]

}
