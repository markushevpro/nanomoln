import type { IDirInfo } from '~/services/fs/types'

import { fsService } from '~/services/fs/service'

interface IFoldersGetPayload {
    path: string
    top: string
}

export
function get
( payload: IFoldersGetPayload ): IDirInfo[]
{
    const info = fsService.dir.content( payload.path )
    return info.folders.map( dir => fsService.dir.extend( payload.top, dir ))
}
