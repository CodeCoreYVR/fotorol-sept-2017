const repl = require('repl')
const kx = require('./db/connection')
const {log} = console

const context = repl.start('💻 ').context

context.log = log
context.kx = kx
