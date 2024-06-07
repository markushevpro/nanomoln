const fs = require('fs')
const path = require('path')
const readline = require('node:readline')

const defaultConfig = JSON.parse( fs.readFileSync( './config.json' ))
const config = { ...defaultConfig }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.write( 'Welcome to Nanomoln installation\n' )

rl.question( `Please provide public ip or host name (default: "${config.host}"):`, async ( host ) => {
    config.host = host || config.host
    
    await rl.question( `Port to run on (default: "${config.port}"):`, async ( port ) => {
        config.port = port || config.port

        await rl.question( `Which MIME type you want to accept? (default: "${config.accept.join( ', ' )}):`, async ( accept ) => {
            config.accept = accept ? accept.split( ',' ) : config.accept

            rl.write( `Your local folder to manipulate (one per line, empty is exit):\n`)
        
            const paths = []
            
            for await (const line of rl) {
                if ( line ) {
                    paths.push( line )
                } else {
                    break
                }
            }

            config.paths = paths

            fs.writeFileSync( path.resolve( __dirname, 'config.json' ), JSON.stringify( config, undefined, 4 ))

            console.log( 'Thank you for using Nanomoln. Enjoy.' )
        })
    })
})