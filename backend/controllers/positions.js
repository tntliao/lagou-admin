const positionModel = require('../models/position')

const addPosition = async (req, res, next) => {
    console.log(req.companyLogo);
    res.set('content-type', 'application/json')
    const result = await positionModel.addPosition({ ...req.body })
    if (result) {
        process.socket.emit('message', 'ok')
        res.send({
            code: 1,
            message: '添加职位成功'
        })
    } else {
        res.send({
            code: 0,
            message: '添加职位错误'
        })
    }
}

const getPosition = async (req, res, next) => {
    const positionList = await positionModel.findPosition()
    res.send(positionList)
}

const removePosition = async (req, res, next) => {
    const result = await positionModel.removePosition(req.query.id)
    if (result) {
        res.send({
            code: 1,
            message: '删除成功'
        })
    } else {
        res.send({
            code: 0,
            message: '删除失败'
        })
    }
}

exports.addPosition = addPosition
exports.getPosition = getPosition
exports.removePosition = removePosition