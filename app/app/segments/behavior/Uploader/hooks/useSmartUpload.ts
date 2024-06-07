import type { FileWithPath } from '@mantine/dropzone'

import { useCallback, useMemo } from 'react'

import { useFilesHandlers } from '~/services/folder/hooks/useFilesHandlers'
import { useFolder }        from '~/services/folder/hooks/useFolder'

import { getFilesIntersection } from '../helpers'

import { useOverwriteConfirmation } from './useOverwriteConfirmation'

interface IUseSmartUploadResult
{
    upload: ( files: FileWithPath[]) => void
}

export
function useSmartUpload
(): IUseSmartUploadResult
{
    const { data: folder }  = useFolder()
    const { upload }        = useFilesHandlers()
    const { confirm, hide } = useOverwriteConfirmation()

    const uploadAll = useCallback(
        ( files: File[]) => () => {
            void upload( files, folder?.path ?? '' )
            hide()
        },
        [ folder, hide, upload ]
    )

    const uploadNonExist = useCallback(
        ( files: File[], intersection: File[]) => () => {
            const clean = files.filter( f => !intersection.includes( f ))

            if ( clean.length > 0 ) {
                void upload( clean, folder?.path ?? '' )
            }

            hide()
        },
        [ folder, upload, hide ]
    )

    const confirmUpload = useCallback(
        ( files: FileWithPath[], intersection: File[]) => {
            confirm(
                intersection,
                uploadAll( files ),
                uploadNonExist( files, intersection )
            )
        },
        [ confirm, uploadAll, uploadNonExist ]
    )

    const checkOverwrite = useCallback(
        ( files: FileWithPath[]) => {
            const intersect = getFilesIntersection( files, folder?.files ?? [])

            ;( intersect.length > 0 )
                ? confirmUpload( files, intersect )
                : void upload( files, folder?.path ?? '' )
        },
        [ confirmUpload, upload, folder ]
    )

    const handleUpload = useCallback(
        ( files: FileWithPath[]) => {
            if ( folder?.path ) {
                checkOverwrite( files )
            }
        },
        [ folder, checkOverwrite ]
    )

    return useMemo(() => ({ upload: handleUpload }), [ handleUpload ])
}
