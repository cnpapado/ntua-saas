const insertStatement =
`INSERT INTO totalload values(?,?,?,?,?)
 ON DUPLICATE KEY UPDATE UpdateTime = ?`

 module.exports = insertStatement