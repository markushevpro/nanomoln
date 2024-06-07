import { useCallback } from 'react'

import { useFilesStoreData, useFilesStoreActions } from '~/shared/stores/files'

import { createFolderIn } from './helpers'

type TUseCreateFolderResult = () => void

export
function useCreateFolder
(): TUseCreateFolderResult
{
    const { folder, top } = useFilesStoreData()
    const { update }      = useFilesStoreActions()

    const handler = useCallback(
        () =>
        {
            if ( update ) {
                const payload = createFolderIn( folder, top )

                if ( payload ) {
                    update( payload )
                }
            }
        },
        [ folder, top, update ]
    )

    return handler
}
