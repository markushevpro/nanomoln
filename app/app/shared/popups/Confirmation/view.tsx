import type { ReactNode } from 'react'

import { Group, Modal } from '@mantine/core'

import styles                   from './confirmaton-popup.module.css'
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
            <div className={styles.content}>
                { text }
            </div>

            <Group mt="xl">
                { buttons }
            </Group>
        </Modal>
    )
}
