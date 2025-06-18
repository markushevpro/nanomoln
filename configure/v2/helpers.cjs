const { log, select, ask } = require( '../cli.cjs' )

module.exports = {
    defineList,
    askExtentions
}

async function defineList
( _prefix, cfg, key, single, plural, format, handlers, allowEmpty )
{
    const prefix = _prefix ? `[ ${_prefix} ] ` : ''
    const keys   = Object.keys( cfg[ key ])

    const choices = [
        {
            name:  `Add new ${single}`,
            value: 'add'
        }
    ]

    if ( keys.length > 0 ) {
        log(
            `${prefix}You have following ${plural} in your config:`
        )

        listKeysAndValues( cfg[ key ], format )

        choices.push({
            name:  `Update a ${single}`,
            value: 'update'
        })

        choices.push({
            name:  `Remove a ${single}`,
            value: 'remove'
        })
    } else {
        log(
            `${prefix}You don't have any ${plural} configured.`
        )
    }

    if ( keys.length > 0 || allowEmpty ) {
        choices.push({
            name:  'Keep as is, go further',
            value: 'skip'
        })
    }

    const action = await select({
        message: `${prefix}What you want to do?`,
        choices
    })

    switch ( action ) {
        case 'add':
            await handlers.add( cfg )
            await defineList( prefix, cfg, key, single, plural, format, handlers, allowEmpty )
            break

        case 'update':
            await handlers.update( cfg )
            await defineList( prefix, cfg, key, single, plural, format, handlers, allowEmpty )
            break

        case 'remove':
            await handlers.remove( cfg )
            await defineList( prefix, cfg, key, single, plural, format, handlers, allowEmpty )
            break

        default:
            // Do nothing
    }
}

async function listKeysAndValues
( obj, _format )
{
    const keys   = Object.keys( obj )
    const format = _format ?? ( val => val )

    log(
        `\n${keys.map( key => `- ${key}: [${format( obj[ key ]).join( ', ' )}]` ).join( '\n' )}\n`
    )
}

async function askExtentions
( def )
{
    const exts = await ask( 'Type a list of extentions you allow for this mime type (ex. .html, .png):', def )
    return exts.split( ',' ).map( ext => `.${ext.trim().toLowerCase()}`.replace( /^\.+/, '.' ))
}
