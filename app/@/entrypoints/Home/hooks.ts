import {  useLoaderData }     from '@remix-run/react'
import { useEffect, useMemo } from 'react'

import type { loader }      from './loader'
import type { IWithConfig } from '~/services/config/helpers'

import { useFilesStoreActions } from '~/services/files/store'

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
