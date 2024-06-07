import type { ReactNode } from 'react'

import { Table, Checkbox } from '@mantine/core'
import cn                  from 'classnames'

import styles from './list-header.module.css'

interface IListHeaderProps
{
    selected?: boolean
    selection: string[]
    total: number
    selectionActions: ReactNode
    onSelectAll: () => void
}

export
function ListHeader
({ selected, selection, total, selectionActions, onSelectAll }: IListHeaderProps )
{
    return (
        <Table.Thead>
            <Table.Tr>
                <Table.Th w="40px">
                    <Checkbox
                        checked={selected && selection.length === total}
                        indeterminate={selected && selection.length !== total}
                        onChange={onSelectAll}
                    />
                </Table.Th>

                <Table.Th colSpan={5}>
                    <div className={styles.container}>
                        <span className={cn( styles.selected, selection && selection.length < 1 && styles.empty )}>
                            {
                            selected && (
                                <>
                                    {selection.length} selected
                                </>
                            )
                        }
                        </span>

                        <div className={styles.actions}>
                            { selectionActions }
                        </div>
                    </div>
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
    )
}
