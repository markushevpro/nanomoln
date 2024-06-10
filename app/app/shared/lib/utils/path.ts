import type { ITopPathInfo } from '~/services/fs/types'

export
function universalPath
( path: string ): string
{
    return path.replace( /[\\]+/g, '/' )
}

export
function relativePath
( top: ITopPathInfo, path: string ): string
{
    return universalPath( path ).replace( top.path, '' )
}
