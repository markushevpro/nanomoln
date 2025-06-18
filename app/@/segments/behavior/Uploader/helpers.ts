import type { FileWithPath } from '@mantine/dropzone'
import type { IFileInfo }    from '~/services/fs/types'

import { maxFilesShowingInList } from './consts'

export
function getFilesIntersection
( upload: FileWithPath[], check: IFileInfo[]): FileWithPath[]
{
    return upload.filter( f => check.find( cf => cf.filename === f.name ))
}

export
function cutList
<T>
( arr: T[]): {
    show: T[],
    more: number
}
{
    const show = arr.length > maxFilesShowingInList ? arr.slice( 0, maxFilesShowingInList ) : arr

    return {
        show,
        more: arr.length - show.length
    }
}
