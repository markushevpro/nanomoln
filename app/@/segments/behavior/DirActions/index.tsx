import { RemoveButton } from '@/segments/behavior/RemoveButton'
import { RenameButton } from '@/segments/behavior/RenameButton'

import type { IDirInfo } from '~/services/fs/types'

interface IDirActionsProps
{ dir: IDirInfo }

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
