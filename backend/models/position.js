const moment = require('moment')
const { Positions } = require('../utils/db')


const addPosition = ({ city, salary, companyName, positionName, companyLogo }) => {
    const positions = new Positions({
        city,
        salary,
        companyName,
        positionName,
        companyLogo,
        createTime: moment().format('YYYY年M月D日H时m分')
    })
    return positions.save()
}


const findPosition = () => {
    return Positions.find()
}

const removePosition = (id) => {
    return Positions.deleteOne({ id })
}

exports.addPosition = addPosition
exports.findPosition = findPosition
exports.removePosition = removePosition

