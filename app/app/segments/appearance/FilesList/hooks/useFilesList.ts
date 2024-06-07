import type { ISelection } from '~/shared/lib/hooks/useSelection'
import type { IListItem }  from '~/shared/ui-kit/List/types'

import { useState, useEffect, useMemo } from 'react'

import { useFolder }         from '~/services/folder/hooks/useFolder'
import { useSelection }      from '~/shared/lib/hooks/useSelection'
import { useFilesStoreData } from '~/shared/stores/files'

import { joinList } from './helpers'

interface IUseFilesListResult
{
    list: IListItem[]
    selection: ISelection<string>
}

export
function useFilesList
(): IUseFilesListResult
{
    const selection = useSelection<string>([])
    const { set }   = selection

    const { top }          = useFilesStoreData()
    const { data: folder } = useFolder()

    const [ list, $list ] = useState<IListItem[]>( joinList( top, folder ))

    useEffect(() => {
        $list( joinList( top, folder ))
    }, [ top, folder ])

    useEffect(() => {
        set([])
    }, [ folder, set ])

    return useMemo(
        () => ({
            list,
            selection
        }),
        [ list, selection ]
    )
}
