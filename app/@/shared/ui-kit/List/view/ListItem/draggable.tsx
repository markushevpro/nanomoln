import { Table } from '@mantine/core'
import cn        from 'classnames'

import { useDnDList }     from '@/shared/ui-kit/List/hooks/useDnDList'
import { extractDnDData } from '@/shared/ui-kit/List/utils'

import type { IListItemProps } from '@/shared/ui-kit/List/types'
import type { ReactNode }      from 'react'

import styles from './list-item.module.css'

export
function DraggableListItem
({ selection, onDrop, ...props }: Omit<IListItemProps, 'draggable'> ): ReactNode
{
    const { item } = props

    const { ref, isDragging, isOver } = useDnDList( 'file', extractDnDData( item ), selection, onDrop )

    const Component = props.component

    return (
        <Table.Tr ref={ref} className={cn( props.locked && styles.locked, isDragging && styles.drag, isOver && styles.drop )}>
            <Component {...props} />
        </Table.Tr>
    )
}
