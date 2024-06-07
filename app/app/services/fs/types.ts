export
type TFileType = 'directory' | 'file'

export
interface IFileInfo
    extends IFSInfo, IFSEditable
{
}

export
type IDirInfo = IPathInfo & IFSInfo

export
interface IFSEditable
{
    draft?: boolean
}

export
interface IFSInfo
{
    dir: string
    filename: string
    path: string
    type: TFileType
    size: number
}

export
interface IPathInfo
    extends IFSEditable
{
    path: string
    relative: string
    files: IFileInfo[]
    folders: IDirInfo[]
}

export
interface ITopPathInfo
    extends IPathInfo
{
    hash: string
}
