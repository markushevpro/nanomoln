import type { IFileInfo } from '../types'

import fs from 'fs'

import * as path from './path.module'

export
function getName
( filename: string ): string
{
    return filename.split( '\\' ).pop() ?? filename
}

export
function read
( filename: string ): string
{
    return fs.readFileSync( path.resolve( process.cwd(), filename ), 'utf8' )
}

export
async function rename
( path: string, original: string, update: string ): Promise<void>
{
    // eslint-disable-next-line promise/avoid-new
    await new Promise<void>( resolve => {
        const from = `${path}/${original}`
        const to   = `${path}/${update}`

        if ( fs.existsSync( from )) {
            fs.renameSync( from, to )
        }

        resolve()
    })
}

export
async function move
( files: string[], target: string ): Promise<void>
{
    // eslint-disable-next-line promise/avoid-new
    await new Promise<void>( resolve => {
        if ( fs.existsSync( target )) {
            files.forEach( file => {
                if ( file !== target && path.getDir( file ) !== target && fs.existsSync( file )) {
                    fs.rename( file, path.resolve( target, getName( file )), ( err ) => {
                        if ( err ) {
                            console.error( 'Move error', err )
                        }
                    })
                } else {
                    console.error( `Error moving file: ${file}` )
                }
            })
        } else {
            console.error( `Path not found: ${target}`)
        }

        resolve()
    })
}

export
async function remove
( list: string[]): Promise<void>
{
    // eslint-disable-next-line promise/avoid-new
    await new Promise<void>( resolve => {
        list.forEach( path => {
            fs.rmSync( path, {
                force:     true,
                recursive: true
            })
        })

        resolve()
    })
}

export
function infoFromFile
( file: File, parent: string ): IFileInfo
{
    return {
        dir:      parent,
        filename: file.name,
        path:     `${parent}/${file.name}`,
        type:     'file',
        size:     File.length
    }
}

export
function infoFromFiles
( files: File[], parent: string ): IFileInfo[]
{
    return files.map( file => infoFromFile( file, parent ))
}
