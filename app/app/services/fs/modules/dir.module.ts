import type { IDirInfo, IFSInfo, IPathInfo, ITopPathInfo } from '../types'

import fs from 'fs'

import * as path from './path.module'

export
function read
( dir: string ): string[]
{
    // TODO: Support relative too
    return fs.readdirSync( dir )
}

export
function draft
( parent?: IDirInfo ): IDirInfo
{
    return {
        type:     'directory',
        dir:      parent?.path ?? '',
        draft:    true,
        relative: '',
        path:     '',
        filename: '',
        size:     0,
        files:    [],
        folders:  []
    }
}

export
function create
( dir: string, name: string ): string | undefined
{
    return fs.mkdirSync( path.resolve( dir, name ), { recursive: true })
}

export
function find
( parent: IDirInfo | ITopPathInfo, subfolder: string ): IDirInfo | undefined
{
    if ( !subfolder.includes( '/' )) {
        return parent.folders.find( folder => folder.relative === subfolder )
    }

    const parts     = subfolder.split( '/' )
    const subparent = parent.folders.find( folder => folder.relative === parts[ 0 ])

    if ( subparent ) {
        return find( extendDeep( subparent ), parts.slice( 1 ).join( '/' ))
    }
}

export
function content
( dir: string ): Pick<IDirInfo, 'files' | 'folders'>
{
    const filenames = fs.readdirSync( dir, 'utf8' )
    const items     = filenames.map( filename => path.stats( dir, filename ))
    const files     = items.filter( info => info.type === 'file' )
    const folders   = items.filter( info => info.type === 'directory' ).map( info => extend( dir, info ))

    return {
        files,
        folders
    }
}

export
function extend
( parent: string, target: IFSInfo ): IDirInfo
{
    const { files, folders } = content( target.path )

    return {
        ...target,
        relative: path.relative( parent, target.path ),
        files,
        folders
    }
}

export
function extendDeep
<T extends IPathInfo>
( parent: T, topLevel?: string ): T
{
    return {
        ...parent,
        relative: parent.relative ?? '',
        folders:  parent.folders.map( folder => extend( topLevel ?? parent.path, folder ))
    }
}
