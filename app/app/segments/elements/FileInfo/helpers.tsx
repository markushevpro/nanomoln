import type { IFileInfo }     from '~/services/fs/types'
import type { IInfoListItem } from '~/shared/ui-kit/InfoList/types'

import { filesize } from 'filesize'

import { FileType } from '~/shared/ui-kit/FileType'

export
function formatItems
( data: IFileInfo ): IInfoListItem[]
{
    const res: IInfoListItem[] = []

    res.push({
        key:     'size',
        content: filesize( data.size )
    })

    res.push({
        key:     'ext',
        content: <FileType path={data.filename} />
    })

    return res
}
