import { useCallback } from 'react'

import { createFolderIn } from './helpers'

import { useFilesStoreData, useFilesStoreActions } from '~/services/files/store'

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
