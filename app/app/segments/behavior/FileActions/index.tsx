import type { IFileInfo } from '~/services/fs/types'

import { DownloadButton } from '../DownloadButton'
import { RemoveButton }   from '../RemoveButton'
import { RenameButton }   from '../RenameButton'

interface IFileActionsProps
{
    file: IFileInfo
}

export
function FileActions
({ file }: IFileActionsProps )
{
    return (
        <>
            <RenameButton item={file} size="md" />
            <DownloadButton file={file} size="md" />
            <RemoveButton files={[ file.path ]} size="md" />
        </>
    )
}
