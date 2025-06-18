const fs = require( 'fs' )

function loadConfig
()
{
    const defaultConfig = JSON.parse( fs.readFileSync( './config.json' ))
    return { ...defaultConfig }
}

function saveConfig
( data )
{
    fs.writeFileSync( './config.json', JSON.stringify( data, undefined, 4 ))
}

module.exports = {
    loadConfig,
    saveConfig
}
