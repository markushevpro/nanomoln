import type { MantineSize }         from '@mantine/core'
import type { IDirInfo, IFileInfo } from '~/services/fs/types'

import { ActionIcon }  from '@mantine/core'
import { IconPencil }  from '@tabler/icons-react'
import { useCallback } from 'react'

import { useFolder } from '~/services/folder/hooks/useFolder'

interface IRenameButtonProps
{
    item: IFileInfo | IDirInfo
    size?: MantineSize
}

export
function RenameButton
({ item, size }: IRenameButtonProps )
{
    const { edit } = useFolder()

    const rename = useCallback(
        () => {
            edit( item )
        },
        [ edit, item ]
    )

    return (
        <>
            <ActionIcon
                size={ size ?? 'lg' }
                variant='subtle'
                onClick={rename}
            >
                <IconPencil size={20} />
            </ActionIcon>
        </>
    )
}
