import type { IWithConfig } from './helpers'

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
    private readonly config: IConfig | null

    error: unknown = undefined

    constructor
    ()
    {
        try {
            this.config = jsonService.read( './config.json' )
            this.fixPaths()
            console.log( '[nanomoln] Config loaded:', this.config )
        } catch ( e ) {
            this.error  = e
            this.config = null
        }
    }

    fixPaths
    (): void
    {
        if ( this.config ) {
            this.config.paths = this.config.paths.map( p => universalPath( p ))
        }
    }

    get
    (): IWithConfig
    {
        return {
            config: this.config,
            error:  this.error
        }
    }

    getPaths
    (): string[] | undefined
    {
        return this.config?.paths
    }

    getAccept
    (): string[]
    {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this.config?.accept || []
    }

    allow
    ( type: string ): boolean
    {
        if ( this.config?.accept.includes( type )) {
            return true
        }

        // TODO: Wildcard types, etc audio/*
        return false
    }
}

export
const configService = new ConfigService()
