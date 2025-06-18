import { Table } from '@mantine/core'

import type { IFileCellSharedProps } from './types'
import type { ReactNode }            from 'react'

import styles from './file-cell.module.css'

import { BlockLink } from '~/shared/ui-kit/BlockLink'
import { EditInput } from '~/shared/ui-kit/EditInput'

interface IFileCellContentProps
    extends IFileCellSharedProps
{
    text: string
    link?: string
    draft?: boolean
    onSave?: ( value: string ) => void
}

export
function FileCellContent
({ visible, locked, draft, text, link, onSave }: IFileCellContentProps ): ReactNode
{
    if ( !visible ) {
        return null
    }

    return (
        <Table.Td maw="100%">
            {
                ( draft && onSave )
                    ? (
                        <EditInput disabled={locked} value={text} onSave={onSave} />
                    )
                    : (
                        link
                            ? (
                                <BlockLink className={styles.link} to={link}>
                                    { text }
                                </BlockLink>

                            )
                            : (
                                <div className={styles.file}>
                                    { text }
                                </div>
                            )
                    )
            }
        </Table.Td>
    )
}
