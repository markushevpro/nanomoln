import type { IDirInfo } from '~/services/fs/types'

import { RemoveButton } from '../RemoveButton'
import { RenameButton } from '../RenameButton'

interface IDirActionsProps
{
    dir: IDirInfo
}

export
function DirActions
({ dir }: IDirActionsProps )
{
    return (
        <>
            <RenameButton item={dir} size="md" />
            <RemoveButton files={[ dir.path ]} size="md" />
        </>
    )
}
