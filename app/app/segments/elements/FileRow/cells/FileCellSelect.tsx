import type { IFileCellSharedProps } from './types'

import { Table, Checkbox }                               from '@mantine/core'
import { useCallback, type ChangeEvent, type ReactNode } from 'react'

import styles from './file-cell.module.css'

interface IFileCellSelectProps
    extends IFileCellSharedProps
{
    checked?: boolean
    onToggle?: ( state: boolean ) => void
}

export
function FileCellSelect
({ visible, checked, onToggle }: IFileCellSelectProps ): ReactNode
{
    const handleToggle = useCallback(
        ( e: ChangeEvent<HTMLInputElement> ) => {
            onToggle?.( e.currentTarget.checked )
        },
        [ onToggle ]
    )

    if ( !visible ) {
        return null
    }

    return (
        <Table.Td className={styles.fixed} w="40px">
            <Checkbox checked={checked} onChange={handleToggle} />
        </Table.Td>
    )
}
