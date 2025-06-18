import { ActionIcon } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'

import type { ReactNode } from 'react'

export
function UploadIcon
({ onClick }: { onClick: () => void }): ReactNode
{
    return (
        <ActionIcon c="primary.0" size="lg" onClick={onClick}>
            <IconUpload size="20" />
        </ActionIcon>
    )
}
