const Database = require('../db/config.js')

module.exports = {
  async create(req, res) {
    db = await Database()
    const password = req.body.password
    let roomId = ''
    let tryRoom = true

    while (tryRoom) {
      for (let i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }
      const dbRooms = await db.all(`SELECT id FROM rooms`)
      tryRoom = dbRooms.some(rooms => rooms === roomId)
      if (!tryRoom) {
        await db.run(`INSERT INTO rooms (
          id,
          password
          ) VALUES (
          ${parseInt(roomId)},
          "${password}"
          )`)
      }
    }

    await db.close()
    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND read = 1`
    )
    let isQuestions = true
    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isQuestions = false
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isQuestions: isQuestions
    })
  },

  enter(req, res) {
    roomId = req.body.roomId
    res.redirect(`/room/${roomId}`)
  }
}
