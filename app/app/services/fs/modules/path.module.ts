import type { IFSInfo, ITopPathInfo } from '../types'

import fs    from 'fs'
import _path from 'path'

import { hashService } from '~/services/hash'

import * as dir from './dir.module'

export
function getDir
( path: string ): string
{
    return _path.dirname( path )
}

export
function resolve
( dir: string, file: string ): string
{
    return _path.resolve( dir, file )
}

export
function relative
( parent: string, fullpath: string ): string
{
    return _path.relative( parent, fullpath ).replace( /\\/g, '/' )
}

export
function stats
( dir: string, filename: string ): IFSInfo
{
    const fullpath = resolve( dir, filename )
    const stats    = fs.statSync( fullpath )

    return {
        dir,
        filename,
        path: fullpath,
        type: stats.isDirectory() ? 'directory' : 'file',
        size: stats.size
    }
}

export
function info
( path: string ): ITopPathInfo
{
    const { files, folders } = dir.content( path )

    return {
        hash:     hashService.get( path ),
        relative: '',
        path,
        files,
        folders
    }
}

export
function infoList
( paths: string[]): ITopPathInfo[]
{
    return paths.map( path => info( path ))
}
