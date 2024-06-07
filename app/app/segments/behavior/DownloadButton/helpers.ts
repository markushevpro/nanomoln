import type { IFileInfo, ITopPathInfo } from '~/services/fs/types'

export
function getRelative
( top: ITopPathInfo, file: IFileInfo ): string
{
    return file.path
        .replace( /[\\]+/g, '/' )
        .replace( top.path, '' )
}
