import type { IPathInfo }     from '~/services/fs/types'
import type { IInfoListItem } from '~/shared/ui-kit/InfoList/types'

import { IconFileFilled, IconFolderFilled } from '@tabler/icons-react'

export
function formatItems
( data: IPathInfo ): IInfoListItem[]
{
    const res: IInfoListItem[] = []

    res.push( data.folders.length > 0 && ({
        key:     'folders',
        icon:    IconFolderFilled,
        content: data.folders.length
    }))

    res.push( data.files.length > 0 && ({
        key:     'files',
        icon:    IconFileFilled,
        content: data.files.length
    }))

    return res
}
