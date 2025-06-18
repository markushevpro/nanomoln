import { Button, Divider }      from '@mantine/core'
import { useCallback, useMemo } from 'react'

import { cutList } from '@/segments/behavior/Uploader/helpers'

import type { FileRejection } from '@mantine/dropzone'
import type { ReactNode }     from 'react'

import styles from './upload-list.module.css'

import { useConfirmationPopup } from '~/shared/popups/Confirmation'

function RejectedContent
({ rejected }: { rejected: FileRejection[] }): ReactNode
{
    const { show, more } = cutList( rejected )

    return (
        <>
            <p>This files can&apos;t be uploaded:</p>

            <ul className={styles.list}>
                {
                    show.map( info => (
                        <li key={info.file.name} className={styles.item} title={info.file.name}>
                            <span className={styles.wrapper}>
                                { info.file.name }
                            </span>

                            <small>
                                <em>
                                    (
                                    { info.file.type || 'uknonwn'}
                                    )
                                </em>
                            </small>
                        </li>
                    ))
                }
            </ul>

            {
                more > 0 && (
                    <p>
                        <strong>
                            And
                            {more}
                            {' '}
                            more
                        </strong>
                    </p>
                )
            }

            <Divider />

            <p>
                <i>
                    <small>
                        If you want to upload such files, please update &quot;accept&quot; values in your config.json and restart nanomoln.
                    </small>
                </i>
            </p>
        </>
    )
}

function RejectedButtons
({ onClose }: { onClose?: () => void }): ReactNode
{
    const { hide } = useConfirmationPopup()

    const handleClose = useCallback(
        () => {
            onClose?.()
            hide()
        },
        [ onClose, hide ]
    )

    return (
        <>
            <Button style={{ marginLeft: 'auto' }} variant="subtle" onClick={handleClose}>
                Ok
            </Button>
        </>
    )
}

interface IRejectedResult
{
    confirm: ( rejected: FileRejection[] | undefined ) => void
    hide: () => void
}

export
function useRejectedConfirmation
(): IRejectedResult
{
    const { show, hide } = useConfirmationPopup()

    const confirm = useCallback(
        ( rejected: FileRejection[] | undefined, success?: () => void ) =>
        {
            if ( rejected && rejected.length > 0 ) {
                show(
                    'Files not allowed to upload',
                    <RejectedContent rejected={rejected} />,
                    <RejectedButtons onClose={success} />

                )
            } else {
                console.error( 'Trying to show empty rejected confirmation' )
            }
        }, [ show ])

    return useMemo(
        () => ({
            confirm,
            hide
        }),
        [ confirm, hide ]
    )
}
