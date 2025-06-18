const { log }                    = require( './cli.cjs' )
const { loadConfig, saveConfig } = require( './config.cjs' )
const { configure }              = require( './latest.cjs' )
const { checkMigration }         = require( './migration.cjs' )
const { recheck }                = require( './recheck.cjs' )

const config = loadConfig()

run()

async function run
()
{
    log(
        'Welcome to Nanomoln installation'
    )

    checkMigration( config )

    await configure( config )

    let check = await recheck( config )

    while ( !check ) {
        await configure( config )
        check = await recheck( config )
    }

    saveConfig( config )
    log( 'Thank you for using Nanomoln. Enjoy.' )
}
