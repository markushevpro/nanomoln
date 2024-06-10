import type { ReactNode } from 'react'

import { ActionIcon } from '@mantine/core'
import { IconReload } from '@tabler/icons-react'

export
function RefreshButton
(): ReactNode
{
    const reload = (): void => {
        window.location.reload()
    }

    return (
        <>
            <ActionIcon c="primary.0" size="lg" onClick={reload}>
                <IconReload size="20" />
            </ActionIcon>
        </>
    )
}
