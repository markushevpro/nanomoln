/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import type { IConfig, IConfigPaths } from './types'

import { jsonService }   from '~/services/json'
import { universalPath } from '~/shared/lib/utils/path'

import { getMaxSize, isAllowed, type IWithConfig } from './helpers'

export * from './consts'

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
            const res: IConfigPaths = {}

            Object.keys( this.config.paths ).forEach( path => {
                if ( this.config?.paths[ path ]) {
                    res[ universalPath( path ) ] = this.config.paths[ path ]
                }
            })

            this.config.paths = res
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
    (): string[]
    {
        return Object.keys( this.config?.paths ?? {}) ?? []
    }

    getMaxSize
    ( path?: string ): number
    {
        return getMaxSize( this.config, path )
    }

    allow
    ( type: string, filename?: string, folder?: string ): boolean
    {
        return isAllowed( this.config, type, filename, folder )
    }
}

export
const configService = new ConfigService()
