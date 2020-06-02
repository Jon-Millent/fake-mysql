# fake-mysql
generate test data for mysql

## Install

```shell script
npm install fake-mysql -g
```

## Use
传入你配置文件的相对路径，或者绝对路径
```shell script
fakemysql ./config.js
```

## config
config基础参数
```javascript
module.exports = {
    host: 'localhost', //数据库 host
    user: 'root', //数据库 账号
    password: 'root', //数据库 密码
    port: '3306', //数据库 端口
    database: 'school', //数据库 database
    
    mode: 'dev', // 模式 详细见下面
    local: 'zh_CN', // 数据本地化 详细见下面
    tables: [ //表数据结构 详细见下面
        {
            name: 'stu',
            length: 10,
            data: {
                phone: 'attach.phone',
                email: 'attach.email',
                ip: 'internet.ip',
                school: 'attach.school',
                address: 'address.city',
                create_time: 'attach.datetime',
            }
        }
    ]  
}
```

### config.mode
<table>
    <tr>
        <td>说明</td>
        <td>可选值</td>
        <td>默认值</td>
    </tr>
    <tr>
        <td>运行模式</td>
        <td>pord | dev</td>
        <td>pord</td>
    </tr>
</table>

* pord: 运行的数据会存入数据库
* dev: 运行的数据打印在控制台

### config.local
<table>
    <tr>
        <td>说明</td>
        <td>可选值</td>
        <td>默认值</td>
    </tr>
    <tr>
        <td>数据本地化，会影响参数的输出格式</td>
        <td>见下</td>
        <td>zh_CN</td>
    </tr>
</table>

* az
* cz
* de
* de_AT
* de_CH
* en
* en_AU
* en_BORK
* en_CA
* en_GB
* en_IE
* ...

<details>
  <summary>展开查看更多</summary>
  <pre>
    <code>
    * en_IND
    * en_US
    * en_ZA
    * en_au_ocker
    * es
    * es_MX
    * fa
    * fr
    * fr_CA
    * ge
    * id_ID
    * it
    * ja
    * ko
    * nb_NO
    * nep
    * nl
    * pl
    * pt_BR
    * pt_PT
    * ru
    * sk
    * sv
    * tr
    * uk
    * vi
    * zh_CN
    * zh_TW
    </code>
  </pre>
</details>




### config.mode
<table>
    <tr>
        <td>说明</td>
        <td>可选值</td>
        <td>默认值</td>
    </tr>
    <tr>
        <td>运行模式</td>
        <td>pord | dev</td>
        <td>pord</td>
    </tr>
</table>

* pord: 运行的数据会存入数据库
* dev: 运行的数据打印在控制台


### config.tables
<table>
    <tr>
        <td>说明</td>
        <td>可选值</td>
        <td>默认值</td>
    </tr>
    <tr>
        <td>生成数据规则</td>
        <td>/</td>
        <td>/</td>
    </tr>
</table>

```javascript
module.exports = {
    ...
    tables: [ // 可以包含多个表名
        {
            name: 'stu', // 对应数据库表名
            length: 10, // 生成的数据长度
            data: { // 数据类型定义，详细类型见下面，这里的要对应数据库表里面的字段
                phone: 'attach.phone',
                email: 'attach.email',
                ip: 'internet.ip',
                school: 'attach.school',
                address: 'address.city',
                create_time: 'attach.datetime',
                
                class_num: {  // 参数拓展，详细见下面
                    type: 'attach.integer',
                    min: 50,
                    max: 80
                }
            }
        },
        {
            name: 'stu2'
            ...
        },
        ...
    ]  
    ...
}
```

## 数据类型

数据类型对应数据库里面的填充字段，例如直接使用
```javascript
module.exports = {
    ...
    tables: [ 
      name: 'xxxx',
      length: 20,
      data: {
        age: 'attach.name',
      }
    ]
    ...
}    
```
你也可以在此基础上参数拓展
```javascript
module.exports = {
    ...
    tables: [ 
      name: 'xxxx',
      length: 20,
      data: {
        age: {
          type: 'attach.name',
        },
      }
    ]
    ...
}    
```
每个字段支持的自定义拓展参数不一样，但是每个参数都有通用的参数拓展，下面是通用拓展属性
```javascript
module.exports = {
    ...
    tables: [ 
      name: 'xxxx',
      length: 20,
      data: {
        age: {
          type: 'attach.name', // 类型
          maxLength: 20, // 最长限制
          required: true, // 是否必须返回，默认为false，为true此字段有50%的几率为空
          filter(target){ // 自定义过滤器，你可以在参数返回对该参数处理
              return target + '你好'
          }
        },
      }
    ]
    ...
}    
```
## 填充字段
### attach
`attach` 是官方提供类型，类型经过处理，但多数不支持本地化，大多只支持中文

* `school`
  随机学校名称

* `integer`
  范围内的随机整数数字
  ```javascript
  参数拓展
  xxxx: {
      type: 'attach.integer',
      min: 50, // 最小值
      max: 80 // 最大值
  }
  ```
* `floating`
  范围内的随机浮点数字
  ```javascript
  参数拓展
  xxxx: {
      type: 'attach.floating',
      min: 50, // 最小值
      max: 80, // 最大值
      fixed: 3, // 保留小数点
  }
  ```
* `string`
  范围内的随机字符串
  ```javascript
  参数拓展
  xxxx: {
      type: 'attach.string',
      min: 50, // 最小长度
      max: 80, // 最大长度
  }
  ```
* `age`
  范围内的随机年龄
  ```javascript
  参数拓展
  xxxx: {
      type: 'attach.string',
      min: 50, // 最小年龄
      max: 80, // 最大年龄
  }
  ```
  
* `phone`
  随机11位手机号
  
* `qq`
  随机qq

* `name`
  随机人名
  
* `openid`
  随机openid
  
* `unionid`
  随机unionid
  
* `datetime`
  随机datetime，格式 `YYYY-MM-DD HH:mm:ss`
  
* `date`
  随机datetime，格式 `YYYY-MM-DD`
  
* `time`
  随机time，格式 `HH:mm:ss`
  
* `year`
  随机year，格式 `YYYY`
  
* `timestamp`
  随机timestamp，格式 `yyyymmddhhmmss`
  
* `avatar`
  随机头像，格式 `网址`
  
* `qrcode`
  随机二维码，格式 `网址`
  
* `music`
  随机音乐，格式 `网址`
  
  
### faker
来自依赖库 `faker.js` 提供的字段，支持本地化，请根据自己需要使用，如果使用的时候有问题，请提 `issue`
使用示例
```javascript
module.exports = {
    ...
    tables: [ 
      name: 'xxxx',
      length: 20,
      data: {
        age: 'address.zipCode',
      }
    ]
    ...
}    
```
你也可以在此基础上参数拓展，支持默认的拓展参数
```javascript
module.exports = {
    ...
    tables: [ 
      name: 'xxxx',
      length: 20,
      data: {
        zipCode: {
          type: 'address.zipCode',
          target(target) {
            return target + ';'
          }
        },
      }
    ]
    ...
}    
```
全部api列表
* address
  * zipCode
  * city
  * cityPrefix
  * citySuffix
  * streetName
  * streetAddress
  * streetSuffix
  * streetPrefix
  * secondaryAddress
  * county
  * country
  * countryCode
  * state
  * stateAbbr
  * latitude
  * longitude
* commerce
  * color
  * department
  * productName
  * price
  * productAdjective
  * productMaterial
  * product
* company
  * suffixes
  * companyName
  * companySuffix
  * catchPhrase
  * bs
  * catchPhraseAdjective
  * catchPhraseDescriptor
  * catchPhraseNoun
  * bsAdjective
  * bsBuzz
  * bsNoun
* database
  * column
  * type
  * collation
  * engine
* date
  * past
  * future
  * between
  * recent
  * month
  * weekday
* fake
* finance
  * account
  * accountName
  * mask
  * amount
  * transactionType
  * currencyCode
  * currencyName
  * currencySymbol
  * bitcoinAddress
  * iban
  * bic
* hacker
  * abbreviation
  * adjective
  * noun
  * verb
  * ingverb
  * phrase
* helpers
  * randomize
  * slugify
  * replaceSymbolWithNumber
  * replaceSymbols
  * shuffle
  * mustache
  * createCard
  * contextualCard
  * userCard
  * createTransaction
* image
  * image
  * avatar
  * imageUrl
  * abstract
  * animals
  * business
  * cats
  * city
  * food
  * nightlife
  * fashion
  * people
  * nature
  * sports
  * technics
  * transport
  * dataUri
* internet
  * avatar
  * email
  * exampleEmail
  * userName
  * protocol
  * url
  * domainName
  * domainSuffix
  * domainWord
  * ip
  * ipv6
  * userAgent
  * color
  * mac
  * password
* lorem
  * word
  * words
  * sentence
  * slug
  * sentences
  * paragraph
  * paragraphs
  * text
  * lines
* name
  * firstName
  * lastName
  * findName
  * jobTitle
  * prefix
  * suffix
  * title
  * jobDescriptor
  * jobArea
  * jobType
* phone
  * phoneNumber
  * phoneNumberFormat
  * phoneFormats
* random
  * number
  * arrayElement
  * objectElement
  * uuid
  * boolean
  * word
  * words
  * image
  * locale
  * alphaNumeric
* system
  * fileName
  * commonFileName
  * mimeType
  * commonFileType
  * commonFileExt
  * fileType
  * fileExt
  * directoryPath
  * filePath
  * semver

## LICENSE
<a href="http://opensource.org/licenses/MIT">MIT<a>
