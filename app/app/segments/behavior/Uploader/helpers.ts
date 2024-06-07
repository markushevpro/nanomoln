import type { FileWithPath } from '@mantine/dropzone'
import type { IFileInfo }    from '~/services/fs/types'

export
function getFilesIntersection
( upload: FileWithPath[], check: IFileInfo[]): FileWithPath[]
{
    return upload.filter( f => check.find( cf => cf.filename === f.name ))
}
