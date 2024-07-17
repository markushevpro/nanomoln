import type { loader }      from './loader'
import type { IWithConfig } from '~/services/config/helpers'

import {  useLoaderData }     from '@remix-run/react'
import { useEffect, useMemo } from 'react'

import { useFilesStoreActions } from '~/shared/stores/files'

export
function useInitialData
(): IWithConfig
{
    const { data, config, error } = useLoaderData<typeof loader>()
    const { force }               = useFilesStoreActions()

    useEffect(() => {
        force( data )
    }, [ data, force ])

    return useMemo(() => ({
        config,
        error
    }), [ config, error ])
}
