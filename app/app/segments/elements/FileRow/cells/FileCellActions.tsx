import type { IFileCellSharedProps } from './types'
import type { ReactNode }            from 'react'

import { Table } from '@mantine/core'
import cn        from 'classnames'

import { lastCellWidth } from './consts'
import styles            from './file-cell.module.css'

interface IFileCellActionsProps
    extends IFileCellSharedProps
{
    actions?: ReactNode
}

export
function FileCellActions
({ visible, actions }: IFileCellActionsProps ): ReactNode
{
    if ( !visible || !actions ) {
        return null
    }

    return (
        <Table.Td className={cn( styles.pullRight, styles.showOnHover )} w={lastCellWidth}>
            <div className={styles.actions}>
                { actions }
            </div>
        </Table.Td>
    )
}
