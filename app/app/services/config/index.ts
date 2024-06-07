import { jsonService } from '~/services/json'

export
interface IConfig {
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
        console.log( '[nanomoln] Config loaded:', this.config )
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
