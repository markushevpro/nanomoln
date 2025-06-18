import { useState, useEffect, useMemo } from 'react'

import type { IBreadcrumb } from './types'

import { extractActive, extractParents } from './helpers'

import { useFilesStoreData } from '~/services/files/store'

interface IUseBreadcrumbsResult
{
    visible: boolean
    active: string
    path: IBreadcrumb[]
}

export
function useBreadcrumbs
(): IUseBreadcrumbsResult
{
    const { folder, top } = useFilesStoreData()

    const [ active, $active ] = useState<string>( extractActive( folder, top ))
    const [ path, $path ]     = useState<IBreadcrumb[]>( extractParents( top, folder ))

    const visible = useMemo(() => !!top, [ top ])

    useEffect(() => {
        $active( extractActive( folder, top ))
        $path( extractParents( top, folder ))
    }, [ top, folder ])

    return useMemo(() => ({
        visible,
        active,
        path
    }), [ active, path, visible ])
}
