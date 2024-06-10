import type { IListItemData } from '~/shared/ui-kit/List/types'

import { useCallback, useMemo } from 'react'

import { apiService }                              from '~/services/api'
import { infoFromFiles }                           from '~/services/fs/modules/file.module'
import { showError }                               from '~/services/notifications'
import { useFilesStoreActions, useFilesStoreData } from '~/shared/stores/files'

import { checkExist, flushDraft } from './helpers'
import { useFolder }              from './useFolder'

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
    const { data, reload }       = useFolder()
    const { folder, top }        = useFilesStoreData()
    const { lock, temp, update } = useFilesStoreActions()

    const showExistError = useCallback(
        ( name: string ) => {
            showError( 'Error', `Folder or file called "${name}" already exist` )
            lock([])
        },
        [ lock ]
    )

    const rename = useCallback(
        // eslint-disable-next-line max-statements
        async ( item: IListItemData, raw: string ) =>
        {
            const name = raw.split( /(\/|\\)/ )[ 0 ]
            let error  = false

            if ( data && item.draft ) {
                if ( name && name !== item.text ) {
                    if ( item.text ) {
                        if ( !checkExist( data, name, showExistError )) {
                            await apiService.rename( data.path, item.text, name )
                        } else {
                            error = true
                        }
                    } else {
                        if ( !checkExist( data, name, showExistError )) {
                            await apiService.createFolder( data.path, name )
                        } else {
                            error = true
                        }
                    }

                    if ( !error ) {
                        reload?.()
                    }
                } else {
                    update({
                        folder: folder ? flushDraft( folder ) : folder,
                        top:    top ? flushDraft( top ) : top,
                        locked: []
                    })
                }
            }
        },
        [ data, reload, update, folder, top, showExistError ]
    )

    const move = useCallback(
        async ( source: string[], target: string ) =>
        {
            if ( !source.includes( target )) {
                lock( source )
                await apiService.moveFiles( source, target )
                reload?.()
            }
        },
        [ reload, lock ]
    )

    const upload = useCallback(
        async ( files: File[], target: string ) =>
        {
            const tmp = infoFromFiles( files, target )

            temp( tmp )
            lock( tmp.map( f => f.filename ))

            await apiService.uploadFiles( files, target )

            reload?.()
        },
        [ lock, temp, reload ]
    )

    const remove = useCallback(
        async ( list: string []) =>
        {
            lock( list )

            await apiService.removeFiles( list )

            reload?.()
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
