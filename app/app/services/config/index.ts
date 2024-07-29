import type { IWithConfig } from './helpers'

import { jsonService }   from '~/services/json'
import { universalPath } from '~/shared/lib/utils/path'

export * from './consts'

export
interface IConfig {
    maxsize: number
    paths: string[]
    accept: Record<string, string[]>
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
    (): Record<string, string[]>
    {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this.config?.accept || {}
    }

    allow
    ( type: string, exts: string[]): boolean
    {
        const mimes = this.allowedMimes()

        if ( mimes.includes( type ) || this.isExtAllowed( exts )) {
            return true
        }

        // TODO: Wildcard types, etc audio/*
        return false
    }

    isExtAllowed
    ( exts: string[]): boolean
    {
        const allowed = this.allowedExts()
        return allowed.some( ext => exts.includes( ext ) || exts.includes( ext.replace( /^\./, '' )))
    }

    allowedMimes
    (): string[]
    {
        return Object.keys( this.config?.accept ?? {})
    }

    allowedExts
    (): string[]
    {
        const all   = Object.values( this.config?.accept ?? {})
        const joint = all.reduce(( list, arr ) => [ ...list, ...arr ], [])

        return joint.map( ext => ext.toLocaleLowerCase())
    }
}

export
const configService = new ConfigService()
