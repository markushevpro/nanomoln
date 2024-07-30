const readline = require('node:readline')

const input = require('@inquirer/input').default
const select = require('@inquirer/select').default
const confirm = require('@inquirer/confirm').default

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function log ( text )
{
    rl.write( `${text}\n` )
}

async function ask ( message, def )
{
    return await input({ message, default: def }, { clearPromptOnDone: true })
}

module.exports = {
    log,
    ask,
    input,
    select,
    confirm
}