import type { loader }  from './loader'
import type { IConfig } from '~/services/config/types'

import { useLoaderData }      from '@remix-run/react'
import { useEffect, useMemo } from 'react'

import { useFilesStoreActions } from '~/services/files/store'
import { useErrorStoreActions } from '~/shared/stores/error'

interface IUseFolderDataResult
{
    error?: number
    loaded: boolean
    config: IConfig | null
}

export
function useFolderData
(): IUseFolderDataResult
{
    const { data, config, error } = useLoaderData<typeof loader>()

    const { force } = useFilesStoreActions()
    const { set }   = useErrorStoreActions()

    useEffect(() => {
        force( data )
    }, [ data, force ])

    useEffect(() => {
        if ( error ) {
            set( error )
        }
    }, [ error, set ])

    return useMemo(
        () => ({
            error,
            config,
            loaded: !!( data.paths && data.top )
        }),
        [ data, config, error ]
    )
}
