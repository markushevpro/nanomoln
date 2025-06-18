import { useCallback, useMemo } from 'react'

import { getFilesIntersection } from '@/segments/behavior/Uploader/helpers'

import type { FileRejection, FileWithPath } from '@mantine/dropzone'

import { useOverweightConfirmation } from './useOverweightConfirmation'
import { useOverwriteConfirmation }  from './useOverwriteConfirmation'
import { useRejectedConfirmation }   from './useRejectedConfirmation'

import { getMaxSize }       from '~/services/config/helpers'
import { useConfig }        from '~/services/config/useConfig'
import { useFilesHandlers } from '~/services/folder/hooks/useFilesHandlers'
import { useFolder }        from '~/services/folder/hooks/useFolder'

interface IUseSmartUploadResult
{
    upload: ( files: FileWithPath[]) => void
    rejected: ( rejected: FileRejection[], success?: () => void ) => void
}

export
function useSmartUpload
(): IUseSmartUploadResult
{
    const config = useConfig()

    const { data: folder } = useFolder()
    const { upload }       = useFilesHandlers()

    const { confirm: confirmOverwrite, hide: hideOverwrite }   = useOverwriteConfirmation()
    const { confirm: confirmOverweight, hide: hideOverweight } = useOverweightConfirmation()
    const { confirm: rejected }                                = useRejectedConfirmation()

    const uploadAll = useCallback(
        ( files: File[]) => () => {
            void upload( files, folder?.path ?? '' )
            hideOverwrite()
        },
        [ folder, hideOverwrite, upload ]
    )

    const uploadNonExist = useCallback(
        ( files: File[], intersection: File[]) => () => {
            const clean = files.filter( f => !intersection.includes( f ))

            if ( clean.length > 0 ) {
                void upload( clean, folder?.path ?? '' )
            }

            hideOverwrite()
        },
        [ folder, upload, hideOverwrite ]
    )

    const confirmUpload = useCallback(
        ( files: FileWithPath[], intersection: File[]) => {
            const rest = files.filter( f => !intersection.includes( f ))

            confirmOverwrite(
                intersection,
                rest,
                uploadAll( files ),
                uploadNonExist( files, intersection )
            )
        },
        [ confirmOverwrite, uploadAll, uploadNonExist ]
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

    const checkSizes = useCallback(
        ( files: FileWithPath[], success: ( filtered: File[]) => void ) => {
            const maxsize    = getMaxSize( config, folder?.path )
            const overweight = files.filter( f => f.size > maxsize )
            const filtered   = files.filter( f => !overweight.includes( f ))
            const max        = overweight.reduce(( m, f ) => Math.max( m, f.size ), -Infinity )

            if ( overweight.length > 0 ) {
                confirmOverweight(
                    overweight,
                    filtered,
                    max,
                    () => {
                        success( filtered )
                    }
                )
            } else {
                success( filtered )
            }
        },
        [ folder, config, confirmOverweight ]
    )

    const handleUpload = useCallback(
        ( files: FileWithPath[]) => {
            if ( folder?.path ) {
                checkSizes( files, ( filtered: File[]) => {
                    hideOverweight()
                    checkOverwrite( filtered )
                })
            }
        },
        [ folder, checkSizes, checkOverwrite, hideOverweight ]
    )

    return useMemo(() => ({
        upload: handleUpload,
        rejected
    }), [ handleUpload, rejected ])
}
