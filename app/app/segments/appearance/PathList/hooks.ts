import type { IListItem } from '~/shared/ui-kit/List/types'

import { useState, useEffect, useMemo } from 'react'

import { useFilesStoreData } from '~/services/files/store'

import { formatList } from './helpers'

interface IUsePathListResult
{
    list: IListItem[]
}

export
function usePathList
(): IUsePathListResult
{
    const { paths } = useFilesStoreData()

    const [ list, $list ] = useState<IListItem[]>( formatList( paths ))

    useEffect(() => {
        $list( formatList( paths ))
    }, [ paths ])

    return useMemo(() => ({ list }), [ list ])
}
