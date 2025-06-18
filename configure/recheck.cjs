const { log, confirm } = require( './cli.cjs' )

module.exports = { recheck }

async function recheck
( config )
{
    log( '\nLet\'s check thats everything ok with your config.' )
    log( JSON.stringify( config, undefined, 2 ))

    return await confirm({ message: 'Is config ok?' })
}
