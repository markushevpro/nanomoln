import { useCallback } from 'react'

import { useFilesStoreData, useFilesStoreActions } from '~/shared/stores/files'

import { reloadData } from './helpers'

type TUseReloadResult = () => void

export
function useReload
(): TUseReloadResult
{
    const { top, folder } = useFilesStoreData()
    const { update }      = useFilesStoreActions()

    const handler = useCallback(
        () =>
        {
            if ( update ) {
                void reloadData( folder, top ).then( update )
            }
        },
        [ folder, top, update ]
    )

    return handler
}
