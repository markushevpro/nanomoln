import type { IFSInfo, IPathInfo } from '~/services/fs/types'

import { useMemo } from 'react'

import { useFilesStoreData } from '~/shared/stores/files'

import { useCreateFolder } from './useCreateFolder'
import { useEditInFolder } from './useEditInFolder'
import { useReload }       from './useReload'

const sorter = ( a: IFSInfo, b: IFSInfo ): number => a.filename.toLocaleLowerCase().localeCompare( b.filename.toLocaleLowerCase())

interface IUseFolderResult {
    data?: IPathInfo
    reload: ReturnType<typeof useReload>
    create: ReturnType<typeof useCreateFolder>
    edit: ReturnType<typeof useEditInFolder>
}

export
function useFolder
(): IUseFolderResult
{
    const { folder, top, temporary } = useFilesStoreData()

    const reload = useReload()
    const create = useCreateFolder()
    const edit   = useEditInFolder()

    const content = useMemo(() => { return folder ?? top }, [ folder, top ])

    const data = useMemo(() => (
        content
            ? {
                ...content,
                folders: content.folders.sort( sorter ),
                files:   [
                    ...content.files,
                    ...temporary.filter( f => !content.files.find( cf => cf.filename === f.filename ))
                ].sort( sorter )
            }
            : content
    ), [ temporary, content ])

    return {
        data,
        reload,
        create,
        edit
    }
}
