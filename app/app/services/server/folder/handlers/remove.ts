import { fsService } from '~/services/fs/service'

interface IFolderRemovePayload {
    list: string[]
}

export
function remove
( payload: IFolderRemovePayload ): null
{
    void fsService.file.remove( payload.list )

    return null
}
