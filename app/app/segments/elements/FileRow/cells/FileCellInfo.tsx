import type { IFileCellSharedProps } from './types'
import type { ReactNode }            from 'react'

import { Table } from '@mantine/core'
import cn        from 'classnames'

import { lastCellWidth } from './consts'
import styles            from './file-cell.module.css'

interface IFileCellInfoProps
    extends IFileCellSharedProps
{
    info?: ReactNode
    actions: boolean
}

export
function FileCellInfo
({ visible, info, actions }: IFileCellInfoProps ): ReactNode
{
    if ( !visible ) {
        return null
    }

    return (
        <Table.Td className={cn( styles.faded, actions && styles.hideOnHover )} w={lastCellWidth}>
            { info }
        </Table.Td>
    )
}
