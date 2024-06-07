import type { ReactNode } from 'react'

import { Button }               from '@mantine/core'
import { useCallback, useMemo } from 'react'

import { useConfirmationPopup } from '~/shared/popups/Confirmation'

interface IOverwritePayload
{
    intersection: File[]
    onOverwrite: () => void
    onIgnore: () => void
}

function OverwriteContent
({ intersection }: Pick<IOverwritePayload, 'intersection'> ): ReactNode
{
    return (
        <>
            <p>This files will be overwritten:</p>

            <ul>
                {
                    intersection.map( file => (
                        <li key={file.name}>{ file.name }</li>
                    ))
                }
            </ul>
        </>
    )
}

function OverwriteButtons
({ intersection, onOverwrite, onIgnore }: IOverwritePayload ): ReactNode
{
    const { hide } = useConfirmationPopup()

    return (
        <>
            <Button style={{ marginRight: 'auto' }} variant="subtle" onClick={hide}>
                Cancel upload
            </Button>

            <Button color="red" onClick={onOverwrite}>
                {
                intersection.length > 1
                    ? 'Overwrite all'
                    : 'Overwrite'
                }
            </Button>

            {
                intersection.length > 1 && (
                    <Button onClick={onIgnore}>
                        Ignore exist
                    </Button>
                )
            }
        </>
    )
}

interface IOverwriteResult
{
    confirm: ( intersection: File[] | undefined, onOverwrite: () => void, onIgnore: () => void ) => void
    hide: () => void
}

export
function useOverwriteConfirmation
(): IOverwriteResult
{
    const { show, hide } = useConfirmationPopup()

    const confirm = useCallback(( intersection: File[] | undefined, onOverwrite: () => void, onIgnore: () => void ) => {
        if ( intersection && intersection.length > 0 ) {
            show(
                'Files already exist',
                <OverwriteContent intersection={intersection} />,
                <OverwriteButtons intersection={intersection} onIgnore={onIgnore} onOverwrite={onOverwrite} />
            )
        } else {
            console.error( 'Trying to show empty overwrite confirmation' )
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
