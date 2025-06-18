const fs = require( 'fs' )

const { ask, log, select, confirm } = require( '../cli.cjs' )

const { defineList }  = require( './helpers.cjs' )
const { defineMimes } = require( './mimes.cjs' )

module.exports = {
    definePathConfig,
    definePaths
}

async function definePathConfig
( cfg, prefix, allowEmpty )
{
    await defineMaxSize( cfg, prefix )
    await defineMimes( cfg, prefix, allowEmpty )
}

async function defineMaxSize
( cfg, _prefix )
{
    const prefix  = _prefix ? `[ ${_prefix} ] ` : ''
    const maxsize = await ask(
        `${prefix}Maximum allowed file size for upload in bytes (default, can be customized for specific paths)? (current: "${cfg.maxsize}"):`
    )

    cfg.maxsize = +maxsize || cfg.maxsize
}

async function definePaths
( config )
{
    await defineList(
        '',
        config,
        'paths',
        'path',
        'paths',
        ( path ) => Object.keys( path ),
        {
            add:    addPath,
            update: updatePaths,
            remove: removePaths
        },
        false
    )
}

async function addPath
( cfg, def )
{
    const res = {
        accept:  {},
        maxsize: cfg.global.maxsize
    }

    const path = ( await ask( 'Type full path to directory:', def )).replace( /\\+/g, '/' )

    if ( path ) {
        if ( fs.existsSync( path )) {
            cfg.paths[ path ] = res

            await updatePath( cfg, path )
        } else {
            log(
                `Can't find a directory "${path}. Maybe a typo?`
            )
            await addPath( cfg, path )
        }
    }
}

async function updatePaths
( cfg )
{
    await selectPath( cfg, updatePath )
}

async function updatePath
( cfg, key )
{
    await definePathConfig( cfg.paths[ key ], key, true )

    if ( cfg.paths[ key ].maxsize === cfg.global.maxsize ) {
        delete cfg.paths[ key ].maxsize
    }
}

async function removePaths
( cfg )
{
    await selectPath( cfg, removePath )
}

async function removePath
( cfg, path )
{
    if ( await confirm({
        message: `Are you sure to remove "${path}"?`,
        default: false
    })) {
        delete cfg.paths[ path ]
    }
}

async function selectPath
( cfg, handler )
{
    const paths = Object.keys( cfg.paths ).map( key => ({
        name:  key,
        value: key
    }))

    paths.push({ name: 'Go back' })

    const answer = await select({
        message: 'Select path:',
        choices: paths
    })

    if ( answer ) {
        await handler( cfg, answer )
    }
}
