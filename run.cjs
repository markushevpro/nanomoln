const { exec } = require('child_process')
const fs = require('fs')
const { stdout } = require('process')

const config = JSON.parse( fs.readFileSync( './config.json' ))
const proc = exec(`cross-env HOST=${config.host || 'localhost'} PORT=${config.port || '3000'} remix-serve ./build/index.js`)

proc.stdout.on( 'data', ( data ) => {
    stdout.write( data )
})

proc.stderr.on( 'data', ( err ) => {
    stdout.write( 'ERROR: ' )
    stdout.write( err )
})