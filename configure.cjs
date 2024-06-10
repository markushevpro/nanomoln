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

// TODO: Refactor more readable
rl.question( `| Please provide local IP or public host (current: "${config.host}"):`, async ( host ) => {
    config.host = host || config.host
    
    await rl.question( `| Port to run on (current: "${config.port}"):`, async ( port ) => {
        config.port = port || config.port

        await rl.question( `| Which MIME type you want to accept? (current: "${config.accept.join( ', ' )}"):`, async ( accept ) => {
            config.accept = accept ? accept.split( ',' ) : config.accept

            await rl.question( `| Maximum allowed file size for upload in bytes? (current: "${config.maxsize}"):`, async ( maxsize ) => {
                config.maxsize = +maxsize || config.maxsize

                rl.write( '| Provide your local folders to manipulate. (one per line)\n' )
                
                if ( config.paths.length > 0 ) {
                    rl.write( `| (Current list: ${config.paths.join(', ')})\n` )
                    rl.write( '| Press Enter to save current, otherwise list will be overwrited\n' )
                } else {
                    rl.write( '| [ Provide at least one destination path ]\n' )
                    rl.write( '| [ Press Enter when finished ]\n' )
                }
            
                const paths = []

                for await (const line of rl) {
                    if ( line ) {
                        paths.push( line )
                    } else {
                        break
                    }
                }

                if ( paths.length > 0 ) {
                    config.paths = paths
                }

                fs.writeFileSync( path.resolve( __dirname, 'config.json' ), JSON.stringify( config, undefined, 4 ))

                console.log( 'Your config:' )
                console.log(JSON.stringify( config, undefined, 2 ))

                console.log( 'Thank you for using Nanomoln. Enjoy.' )
            })
        })
    })
})