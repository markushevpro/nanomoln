const { defineMainProperties } = require( './main.cjs' )
const { defineGlobalProperties } = require( './global.cjs' )
const { definePaths } = require( './path.cjs' )

module.exports = { configure }

async function configure( config ) 
{
    await defineMainProperties( config )
    await defineGlobalProperties( config )
    await definePaths( config )
}