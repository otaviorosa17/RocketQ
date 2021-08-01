module.exports = {
  index(req, res) {
    const roomId = req.params.code
    const questionId = req.params.question
    const action = req.params.action
    const password = req.body.password
    console.log(roomId, questionId, action, password)
  }
}
