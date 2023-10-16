const config = require('../config.json')
const { exec } = require('child_process')

const plugins = Object.keys(config.plugins)

if (plugins.length === 0) {
  console.log('No plugin to install.')
  process.exit(0)
}

console.log(`Installing the following plugins:\n  - ${plugins.join('\n  - ')}`)
exec(`npm install ${plugins.join(' ')}`, (err) => {
  if (err) console.log(err)
})
