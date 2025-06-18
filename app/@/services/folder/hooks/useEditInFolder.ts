import { useCallback } from 'react'

import type { IDirInfo, IFileInfo } from '~/services/fs/types'

import { editFolderIn } from './helpers'

import { useFilesStoreData, useFilesStoreActions } from '~/services/files/store'

type TUseEditInFolderResult = ( item: IFileInfo | IDirInfo ) => void

export
function useEditInFolder
(): TUseEditInFolderResult
{
    const { folder, top } = useFilesStoreData()
    const { update }      = useFilesStoreActions()

    const handler = useCallback(
        ( item: IFileInfo | IDirInfo ) =>
        {
            if ( update ) {
                const payload = editFolderIn( item, folder, top )

                if ( payload ) {
                    update( payload )
                }
            }
        },
        [ folder, top, update ]
    )

    return handler
}
