const Chance = require('chance');
const chance = new Chance();
const schoolData = require('../data/school.json')

class School {
    static getSchool() {
        return schoolData[chance.integer({ min: 0, max: schoolData.length - 1 })].name
    }
}

module.exports = School
