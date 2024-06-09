import type { ReactNode } from 'react'

import { Button, Divider }      from '@mantine/core'
import { filesize }             from 'filesize'
import { useCallback, useMemo } from 'react'

import { useConfirmationPopup } from '~/shared/popups/Confirmation'

interface IOverwritePayload
{
    overweight: File[]
    other: File[] | undefined
    max: number
    onUpload: () => void
}

function OverweightContent
({ overweight, other, max }: Pick<IOverwritePayload, 'overweight' | 'other' | 'max'> ): ReactNode
{
    return (
        <>
            {
                overweight.length > 1
                    ? (
                        <p>You have { overweight.length } file(s) that are too big (up to {filesize( max )}).</p>
                    )
                    : (
                        <p>This file is too big ({filesize( overweight[ 0 ].size )}).</p>
                    )
            }

            {
                other && other.length > 0 && (
                    <p>You can upload the remaining {other.length} file(s) or cancel upload.</p>
                )
            }

            <Divider />
            <p><i><small>If you want to upload big files, please update &quot;maxsize&quot; value in your config.json and restart nanomoln.</small></i></p>
        </>
    )
}

function OverweightButtons
({ other, onUpload }: Pick<IOverwritePayload, 'other' | 'onUpload'> ): ReactNode
{
    const { hide } = useConfirmationPopup()

    return (
        <>
            <Button style={ other && other.length > 0 ? { marginRight: 'auto' } : {}} variant="subtle" onClick={hide}>
                Cancel upload
            </Button>

            {
                ( other && other.length > 0 ) && (
                    <Button onClick={onUpload}>
                        Upload {other.length} files
                    </Button>
                )
            }
        </>
    )
}

interface IOverwriteResult
{
    confirm: ( overweight: File[] | undefined, other: File[] | undefined, max: number, onUpload: () => void ) => void
    hide: () => void
}

export
function useOverweightConfirmation
(): IOverwriteResult
{
    const { show, hide } = useConfirmationPopup()

    const confirm = useCallback(
        ( overweight: File[] | undefined, other: File[] | undefined, max: number, onUpload: () => void ) =>
        {
            if ( overweight && overweight.length > 0 ) {
                show(
                    'Allowed upload size exceeded',
                    <OverweightContent max={max} other={other} overweight={overweight} />,
                    <OverweightButtons other={other} onUpload={onUpload} />

                )
            } else {
                console.error( 'Trying to show empty overweight confirmation' )
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
