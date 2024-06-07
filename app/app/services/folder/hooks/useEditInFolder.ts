import type { IDirInfo, IFileInfo } from '~/services/fs/types'

import { useCallback } from 'react'

import { useFilesStoreData, useFilesStoreActions } from '~/shared/stores/files'

import { editFolderIn } from './helpers'

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
