import type { ReactNode } from 'react'

import { Group, Modal } from '@mantine/core'

import { useConfirmationPopup } from './store/store'

export
function ConfirmationPopup
(): ReactNode
{
    const { visible, title, text, buttons, hide } = useConfirmationPopup()

    return (
        <Modal
            centered
            opened={visible}
            title={title}
            onClose={hide}
        >
            <div>
                { text }
            </div>

            <Group mt="xl">
                { buttons }
            </Group>
        </Modal>
    )
}
