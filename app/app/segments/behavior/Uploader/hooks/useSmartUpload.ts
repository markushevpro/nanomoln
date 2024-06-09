import type { FileWithPath } from '@mantine/dropzone'

import { useCallback, useContext, useMemo } from 'react'

import { DEFAULT_MAX_SIZE } from '~/services/config/consts'
import { ConfigContext }    from '~/services/config/context'
import { useFilesHandlers } from '~/services/folder/hooks/useFilesHandlers'
import { useFolder }        from '~/services/folder/hooks/useFolder'

import { getFilesIntersection } from '../helpers'

import { useOverweightConfirmation } from './useOverweightConfirmation'
import { useOverwriteConfirmation }  from './useOverwriteConfirmation'

interface IUseSmartUploadResult
{
    upload: ( files: FileWithPath[]) => void
}

export
function useSmartUpload
(): IUseSmartUploadResult
{
    const config = useContext( ConfigContext )

    const { data: folder }                                   = useFolder()
    const { upload }                                         = useFilesHandlers()
    const { confirm: confirmOverwrite, hide: hideOverwrite } = useOverwriteConfirmation()
    const { confirm: confirmOverweight }                     = useOverweightConfirmation()

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
            confirmOverwrite(
                intersection,
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
            const overweight = files.filter( f => f.size > ( config?.maxsize ?? DEFAULT_MAX_SIZE ))
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
        []
    )

    const handleUpload = useCallback(
        ( files: FileWithPath[]) => {
            if ( folder?.path ) {
                checkSizes( files, ( filtered: File[]) => {
                    checkOverwrite( filtered )
                })
            }
        },
        [ folder, checkSizes, checkOverwrite ]
    )

    return useMemo(() => ({ upload: handleUpload }), [ handleUpload ])
}
