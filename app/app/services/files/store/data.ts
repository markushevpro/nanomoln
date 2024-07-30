import type { ITopPathInfo, IPathInfo, IFileInfo } from '~/services/fs/types'

export
interface IFilesStoreData
{
    top?: ITopPathInfo
    paths?: ITopPathInfo[]
    folder?: IPathInfo
    locked: string[]
    temporary: IFileInfo[]
}

export
const filesStoreInitial: IFilesStoreData = {
    top:       undefined,
    paths:     undefined,
    folder:    undefined,
    locked:    [],
    temporary: []
}
