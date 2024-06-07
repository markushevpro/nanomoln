import type { IListItemData } from '~/shared/ui-kit/List/types'

import { useCallback, useMemo } from 'react'

import { apiService }           from '~/services/api'
import { infoFromFiles }        from '~/services/fs/modules/file.module'
import { useFilesStoreActions } from '~/shared/stores/files'

import { useFolder } from './useFolder'

interface IFIlesHandlersResult
{
    rename: ( item: IListItemData, name: string ) => Promise<void>
    move: ( source: string[], target: string ) => Promise<void>
    upload: ( files: File[], target: string ) => Promise<void>
    remove: ( list: string[]) => Promise<void>
}

export
function useFilesHandlers
(): IFIlesHandlersResult
{
    const { data, reload } = useFolder()
    const { lock, temp }   = useFilesStoreActions()

    const rename = useCallback(
        async ( item: IListItemData, raw: string ) =>
        {
            const name = raw.split( /(\/|\\)/ )[ 0 ]

            if ( data && item.draft ) {
                if ( name && name !== item.text ) {
                    if ( item.text ) {
                        await apiService.rename( data.path, item.text, name )
                    } else {
                        await apiService.createFolder( data.path, name )
                    }
                }

                reload?.()
            }
        },
        [ data, reload ]
    )

    const move = useCallback(
        async ( source: string[], target: string ) =>
        {
            if ( !source.includes( target )) {
                lock( source )
                await apiService.moveFiles( source, target )
                reload?.()
                lock([])
            }
        },
        [ reload, lock ]
    )

    const upload = useCallback(
        async ( files: File[], target: string ) =>
        {
            const tmp = infoFromFiles( files, target )

            temp( tmp )
            lock( tmp.map( f => f.path ))

            await apiService.uploadFiles( files, target )

            reload?.()
            lock([])
        },
        [ lock, temp, reload ]
    )

    const remove = useCallback(
        async ( list: string []) =>
        {
            lock( list )

            await apiService.removeFiles( list )

            reload?.()
            lock([])
        },
        [ lock, reload ]
    )

    return useMemo(
        () => ({
            rename,
            move,
            upload,
            remove
        }),
        [ rename, move, upload, remove ]
    )
}
