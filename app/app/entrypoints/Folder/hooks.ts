import type { loader }   from './loader'
import type {  IConfig } from '~/services/config'

import { useLoaderData }      from '@remix-run/react'
import { useEffect, useMemo } from 'react'

import { useFilesStoreActions } from '~/shared/stores/files'

interface IUseFolderDataResult
{
    loaded: boolean
    config: IConfig
}

export
function useFolderData
(): IUseFolderDataResult
{
    const { data, config } = useLoaderData<typeof loader>()
    const { force }        = useFilesStoreActions()

    useEffect(() => {
        force( data )
    }, [ data, force ])

    return useMemo(
        () => ({
            config,
            loaded: !!( data.paths && data.top )
        }),
        [ data, config ]
    )
}
