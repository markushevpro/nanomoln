const { log } = require( '../cli.cjs' )
const { definePathConfig } = require( './path.cjs' )

module.exports = {
    defineGlobalProperties
}

async function defineGlobalProperties ( config )
{
    log( 
        '\nNow let\'s configure your global settings' 
    )

    await definePathConfig( config.global, '' )
}