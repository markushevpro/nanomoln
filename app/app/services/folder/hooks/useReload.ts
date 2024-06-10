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

    // Dirty hack to handle slow upload promises
    const original = typeof window !== 'undefined' ? window.location.pathname : ''

    const handler = useCallback(
        () =>
        {
            if ( update ) {
                void reloadData( folder, top ).then( data => {
                    // eslint-disable-next-line promise/always-return
                    if ( original === window.location.pathname ) {
                        update({
                            ...data,
                            locked: []
                        })
                    }
                })
            }
        },
        [ folder, original, top, update ]
    )

    return handler
}
