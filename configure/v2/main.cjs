const { ask } = require( '../cli.cjs' )

module.exports = { defineMainProperties }

async function defineMainProperties
( config )
{
    await defineHost( config )
    await definePort( config )
}

async function defineHost
( config )
{
    const host = await ask(
        `Please provide local IP or public host (${config.host}):`
    )

    config.host = host || config.host
}

async function definePort
( config )
{
    const port = await ask(
        `Port to run on (${config.port}):`
    )

    config.port = port || config.port
}
