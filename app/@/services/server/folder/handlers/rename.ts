import { fsService } from '~/services/fs/service'

interface IFolderRenamePayload {
    path: string
    original: string
    update: string
}

export
function rename
( payload: IFolderRenamePayload ): null
{
    void fsService.file.rename( payload.path, payload.original, payload.update )

    return null
}
