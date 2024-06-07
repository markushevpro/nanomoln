import type { ReactNode } from 'react'

import { Button }               from '@mantine/core'
import { useCallback, useMemo } from 'react'

import { useFilesHandlers }     from '~/services/folder/hooks/useFilesHandlers'
import { useFolder }            from '~/services/folder/hooks/useFolder'
import { useConfirmationPopup } from '~/shared/popups/Confirmation'

interface IRemoveConfirmationPayload
{
    list: string[]
    onRemove?: () => void
}

function RemoveConfirmationContent
({ list }: IRemoveConfirmationPayload ): ReactNode
{
    const { data: folder } = useFolder()

    const getRemoveList = useCallback(
        (): string => {
            const dirs: string[]  = list.filter( name => folder?.folders.find( f => f.path === name ))
            const files: string[] = list.filter( name => folder?.files.find( f => f.path === name ))

            let res = ''

            if ( files.length > 0 && dirs.length > 0 ) {
                res = `${files.length} ${files.length === 1 ? 'file' : 'files'} and ${dirs.length} ${dirs.length === 1 ? 'directory' : 'directories'}`
            } else {
                if ( files.length > 0 ) {
                    res = files.length === 1
                        ? files[ 0 ]
                        : `${files.length} files`
                } else if ( dirs.length > 0 ) {
                    res = dirs.length === 1
                        ? dirs[ 0 ]
                        : `${dirs.length} directories`
                }
            }

            return res
        },
        [ list, folder ]
    )

    return (
        <>
            <p>Are you sure to remove {getRemoveList()}?</p>
        </>
    )
}

function RemoveConfirmationButtons
({ list, onRemove }: IRemoveConfirmationPayload ): ReactNode
{
    const { hide }   = useConfirmationPopup()
    const { remove } = useFilesHandlers()

    const handleRemove = useCallback(
        (): void =>
        {
            void remove( list )
            hide()
            onRemove?.()
        },
        [ list, hide, remove, onRemove ]
    )

    return (
        <>
            <Button style={{ marginRight: 'auto' }} variant="subtle" onClick={hide}>
                Cancel
            </Button>

            <Button color="red" onClick={handleRemove}>
                Remove
            </Button>
        </>
    )
}

interface IUseRemoveConfirmationResult
{
    confirm: () => void
}

export
function useRemoveConfirmation
( files: string[], onRemove?: () => void ): IUseRemoveConfirmationResult
{
    const { show } = useConfirmationPopup()

    const confirm = useCallback(
        () =>
        {
            show(
                'Removing files',
                <RemoveConfirmationContent list={files} />,
                <RemoveConfirmationButtons list={files} onRemove={onRemove} />
            )
        },
        [ show, files, onRemove ]
    )

    return useMemo(() => ({ confirm }), [ confirm ])
}
