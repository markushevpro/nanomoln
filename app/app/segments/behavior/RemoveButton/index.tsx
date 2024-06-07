import type { MantineSize } from '@mantine/core'

import { ActionIcon }      from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react'

import { useRemoveConfirmation } from './hooks/useRemoveConfirmation'

interface IRemoveButtonProps
{
    files: string[]
    size?: MantineSize
    onRemove?: () => void
}

export
function RemoveButton
({ files, size, onRemove }: IRemoveButtonProps )
{
    const { confirm } = useRemoveConfirmation( files, onRemove )

    return (

        <>
            <ActionIcon
                color="red"
                size={ size ?? 'lg' }
                variant='subtle'
                onClick={confirm}
            >
                <IconTrashFilled size={20} />
            </ActionIcon>
        </>
    )
}
