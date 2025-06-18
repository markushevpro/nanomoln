const crypto = require( 'crypto' )

const generator = require( 'generate-password' )

const { log, ask, password, select, confirm } = require( '../cli.cjs' )

module.exports = { definePassword }

async function definePassword
( config )
{
    log(
        '\nIt\'s STRONGLY reccomended to protect your installation with password.'
    )
    log(
        'In other case, anyone can access your files (if you have a pubic domain or IP without any authorization).'
    )

    const choices = [
        {
            name:  'Provide new password',
            value: 'set'
        },
        {
            name:  'Create new random password',
            value: 'create'
        }
    ]

    let answer

    if ( config.passhash ) {
        answer = await select({
            message: 'You already defined a password earlier. What should we do?',
            choices: [
                {
                    name:  'Use current password',
                    value: 'skip'
                },
                ...choices,
                {
                    name:  'Remove password (not recommeded)',
                    value: 'remove'
                }
            ]
        })
    } else {
        answer = await select({
            message: 'You have no password yet.',
            choices: [
                ...choices,
                {
                    name:  'Continue without password (not recommended)',
                    value: 'skip'
                }
            ]
        })
    }

    switch ( answer ) {
        case 'set':
            await askPassword( config )
            break

        case 'create':
            await generatePassword( config )
            break

        case 'remove':
            await removePassword( config )
            break

        case 'skip':
        default:
            // Do nothing
    }
}

async function askPassword
( config )
{
    const raw = await password({
        message: 'Provide a strong password:',
        mask:    true
    })

    await savePassword( config, raw )
}

async function generatePassword
( config )
{
    const raw = generator.generate({
        length:  8,
        numbers: true
    })

    log(
        `\nYour generated password is: ${raw}\n`
    )

    await ask( 'Press Enter to continue' )

    await savePassword( config, raw )
}

async function removePassword
( config )
{
    if ( await confirm({
        message: 'It\'s strongly recommeded to keep password. Are you sure to remove it?',
        default: false
    })) {
        log(
            'Password protection was removed'
        )

        await ask( 'Press Enter to continue' )

        delete config.passhash
    }
}

async function savePassword
( config, raw )
{
    const hash = generateHash( raw )

    config.passhash = hash

    log(
        'Thank you for being responsible.'
    )
    log(
        'Don\'t forget your password, but you can change it any time by running "npm run config" again.'
    )

    await ask( 'Press Enter to continue' )
}

function generateHash
( str )
{
    const hasher = crypto.createHmac( 'md5', process.cwd())
    return hasher.update( str ).digest( 'hex' )
}
