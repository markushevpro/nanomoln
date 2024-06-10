import { jsonService }   from '~/services/json'
import { universalPath } from '~/shared/lib/utils/path'

export * from './consts'

export
interface IConfig {
    maxsize: number
    paths: string[]
    accept: string[]
}

class ConfigService
{
    private readonly config: IConfig

    constructor
    ()
    {
        this.config = jsonService.read( './config.json' )
        this.fixPaths()
        console.log( '[nanomoln] Config loaded:', this.config )
    }

    fixPaths
    (): void
    {
        this.config.paths = this.config.paths.map( p => universalPath( p ))
    }

    get
    (): IConfig
    {
        return this.config
    }

    getPaths
    (): string[]
    {
        return this.config.paths
    }

    getAccept
    (): string[]
    {
        return this.config.accept || []
    }

    allow
    ( type: string ): boolean
    {
        if ( this.config.accept.includes( type )) {
            return true
        }

        // TODO: Wildcard types, etc audio/*
        return false
    }
}

export
const configService = new ConfigService()
