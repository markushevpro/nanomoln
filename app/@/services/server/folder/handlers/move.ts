import { fsService } from '~/services/fs/service'

interface IFolderMovePayload {
    files: string[]
    target: string
    top: string
}

export
function move
( payload: IFolderMovePayload ): null
{
    void fsService.file.move( payload.files, payload.target )

    return null
}
