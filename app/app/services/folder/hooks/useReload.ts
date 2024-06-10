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
                // eslint-disable-next-line promise/always-return
                void reloadData( folder, top ).then( data => {
                    update({
                        ...data,
                        locked: []
                    })
                })
            }
        },
        [ folder, top, update ]
    )

    return handler
}
