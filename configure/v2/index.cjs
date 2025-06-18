const { defineGlobalProperties } = require( './global.cjs' )
const { defineMainProperties }   = require( './main.cjs' )
const { definePassword }         = require( './password.cjs' )
const { definePaths }            = require( './path.cjs' )

module.exports = { configure }

async function configure
( config )
{
    await defineMainProperties( config )
    await defineGlobalProperties( config )
    await definePaths( config )
    await definePassword( config )
}
