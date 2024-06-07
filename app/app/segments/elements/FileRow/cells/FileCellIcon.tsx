import type { IFileCellSharedProps } from './types'
import type { ReactNode }            from 'react'

import { Table, Center } from '@mantine/core'
import cn                from 'classnames'

import styles from './file-cell.module.css'

interface IFileCellIconProps
    extends IFileCellSharedProps
{
    icon?: ReactNode
}

export
function FileCellIcon
({ visible, icon }: IFileCellIconProps ): ReactNode
{
    if ( !visible ) {
        return null
    }

    return (
        <Table.Td className={cn( styles.icon, styles.faded )} w="40px">
            <Center>
                { icon }
            </Center>
        </Table.Td>
    )
}
