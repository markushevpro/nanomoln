import { DownloadButton } from '@/segments/behavior/DownloadButton'
import { RemoveButton }   from '@/segments/behavior/RemoveButton'
import { RenameButton }   from '@/segments/behavior/RenameButton'

import type { IFileInfo } from '~/services/fs/types'

interface IFileActionsProps
{ file: IFileInfo }

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
