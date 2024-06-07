import type { IPathInfo } from '~/services/fs/types'

import { useMemo } from 'react'

import { useFilesStoreData } from '~/shared/stores/files'

import { useCreateFolder } from './useCreateFolder'
import { useEditInFolder } from './useEditInFolder'
import { useReload }       from './useReload'

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

    const content = folder ?? top

    const data = useMemo(() => (
        content
            ? {
                ...content,
                files: [
                    ...content.files,
                    ...temporary.filter( f => !content.files.find( cf => cf.path !== f.path ))
                ].sort(( a, b ) => b.filename.localeCompare( a.filename ))
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
