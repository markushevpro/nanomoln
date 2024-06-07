import type { IListItemProps } from '../../types'
import type { ReactNode }      from 'react'

import { Table } from '@mantine/core'
import cn        from 'classnames'

import styles from './list-item.module.css'

export
function StaticListItem
( props: Omit<IListItemProps, 'draggable'> ): ReactNode
{
    const Component = props.component

    return (
        <Table.Tr
            className={cn( props.locked && styles.locked )}
            style={{
                userDrag:       'none',
                WebkitUserDrag: 'none'
            }}
        >
            <Component {...props} />
        </Table.Tr>
    )
}
