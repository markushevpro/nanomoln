import { useState, useEffect, useMemo } from 'react'

import type { IListItem } from '~/shared/ui-kit/List/types'

import { formatList } from './helpers'

import { useFilesStoreData } from '~/services/files/store'

interface IUsePathListResult
{ list: IListItem[] }

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
