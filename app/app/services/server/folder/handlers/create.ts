import { fsService } from '~/services/fs/service'

interface IFolderCreatePayload {
    path: string
    name: string
}

export
function create
( payload: IFolderCreatePayload ): string | undefined
{
    return fsService.dir.create( payload.path, payload.name )
}
