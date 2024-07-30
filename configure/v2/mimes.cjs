const { defineList, askExtentions } = require('./helpers.cjs' )
const { log, ask, select, confirm } = require( '../cli.cjs' )

module.exports = {
    defineMimes
}

async function defineMimes ( cfg, prefix, allowEmpty )
{
    await defineList( 
        prefix, 
        cfg, 
        'accept', 
        'mime-type', 
        'mime-types', 
        undefined, 
        { add: addMime, update: updateMimes, remove: removeMimes }, 
        allowEmpty
    )
}

async function addMime ( cfg )
{
    const mime = await ask( `Provide a mime-type you want to allow:` )

    if ( mime ) {
        if ( cfg.accept[ mime.toLocaleLowerCase() ]) {
            log( 'You already have such type in your config.' )
            await addMime( cfg )
        } else {
            cfg.accept[ mime ] = await askExtentions()
        }
    }
}

async function updateMimes ( cfg )
{
    await selectMime( cfg, updateMime )
}

async function updateMime ( cfg, key )
{
    cfg.accept[ key ] = await askExtentions( cfg.accept[ key] )
}

async function removeMimes ( cfg )
{
    await selectMime( cfg, removeMime )
}

async function removeMime ( cfg, mime )
{
    if ( await confirm({ message: `Are you sure to remove "${mime}"?`, default: false })) {
        delete cfg.accept[ mime ]
    }
}

async function selectMime ( cfg, handler )
{
    const mimes = Object.keys( cfg.accept ).map( key => ({
        name: key,
        value: key
    }))

    mimes.push({
        name: 'Go back'
    })

    const answer = await select({
        message: 'Select mime type:',
        choices: mimes
    })
    
    if ( answer ) {
        await handler( cfg, answer )
    }
}
