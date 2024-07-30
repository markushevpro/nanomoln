const { log } = require( './cli.cjs' )
const { arrToObject } = require( './helpers.cjs' )

function checkMigration ( config )
{
    if ( !config.version ) {  // Then migrate from v1 to current
        log( 
            '(Migrating config to new version...)\n'
        )
        
        migrateConfigFrom1to2( config )
    }
}

function migrateConfigFrom1to2 ( config )
{
    config.version = 2

    config.global = {
        maxsize: config.maxsize,
        accept: arrToObject( config.accept, [] )
    }

    delete config.maxsize
    delete config.accept
    
    config.paths = arrToObject( config.paths, { maxsize: config.global.maxsize, accept: config.global.accept })
}

module.exports = {
    checkMigration
}