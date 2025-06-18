export
type IConfigAccept = Record<string, string[]>

export
interface IPathConfig
{
    maxsize: number
    accept: IConfigAccept
}

export
type IConfigPaths = Record<string, Partial<IPathConfig>>

export
interface IConfig {
    passhash?: string
    global: IPathConfig
    paths: IConfigPaths
}
