const fs = require('fs')
const contentFilePath = './token.txt'

function save(content) {
      return fs.writeFileSync(contentFilePath, content)
}

function load() {
      return fs.readFileSync(contentFilePath, 'utf-8')
}

module.exports = { save, load }
