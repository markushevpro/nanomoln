import type { IFileInfo } from '~/services/fs/types'

import { fsService } from '~/services/fs/service'

interface IFoldersGetFilesPayload {
    path: string
}

export
function files
( payload: IFoldersGetFilesPayload ): IFileInfo[]
{
    const info = fsService.dir.content( payload.path )
    return info.files
}
