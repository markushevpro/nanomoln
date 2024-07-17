import type { Params }          from '@remix-run/react'
import type { ITopPathInfo }    from '~/services/fs/types'
import type { IFilesStoreData } from '~/shared/stores/files'

import { configService } from '~/services/config'
import { fsService }     from '~/services/fs/service'

export
function getPaths
( params: Params ): { paths: ITopPathInfo[], target?: ITopPathInfo }
{
    const paths  = fsService.path.infoList( configService.getPaths() ?? [])
    const target = paths.find( info => info.hash === params.path )

    return {
        paths,
        target
    }
}

export
async function loadSubfolder
( top: ITopPathInfo, paths: ITopPathInfo[], subfolder: string ): Promise<IFilesStoreData>
{
    const res: IFilesStoreData = {
        top,
        paths,
        locked:    [],
        temporary: []
    }

    const sub = fsService.dir.find( top, subfolder )

    if ( sub ) {
        res.folder = fsService.dir.extendDeep<typeof sub>( fsService.dir.extend( top.path, sub ), top.path )
    }

    return res
}

export
async function getFolderInfo
( paths: ITopPathInfo[], target: ITopPathInfo, subfolder?: string ): Promise<IFilesStoreData>
{
    const top = fsService.dir.extendDeep( target )

    if ( subfolder ) {
        return await loadSubfolder( top, paths, subfolder )
    }

    return {
        top,
        paths,
        locked:    [],
        temporary: []
    }
}
