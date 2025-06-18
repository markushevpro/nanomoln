import type { IConfig, IPathConfig } from './types'

import { configService, DEFAULT_MAX_SIZE } from '.'

import { filterUnique }       from '~/shared/lib/utils/arrays'
import { getExt, getFullExt } from '~/shared/lib/utils/path'

export
interface IWithConfig
{
    config: IConfig | null
    error: unknown
}

export
function withConfig
<T>
( object: T ): T & IWithConfig
{
    const { config, error } = configService.get()

    return {
        ...object,
        error: error ?? ( object as Record<string, unknown> ).error,
        config
    }
}

export
function getMaxSize
( config?: IConfig | null, path?: string ): number
{
    if ( !config ) {
        return DEFAULT_MAX_SIZE
    }

    const global = config.global.maxsize ?? DEFAULT_MAX_SIZE

    if ( path ) {
        return config.paths[ path ]?.maxsize ?? global
    }

    return global
}

export
function getAccept
( config?: IConfig | null, path?: string ): Record<string, string[]>
{
    if ( !config ) {
        return {}
    }

    const global = config.global.accept
    const local  = path ? config.paths[ path ].accept : undefined

    if ( local ) {
        const res: Record<string, string[]> = {}

        // From global always added
        Object.keys( global ).forEach( key => {
            res[ key ] = global[ key ]
        })

        // From path
        Object.keys( local ).forEach( key => {
            if ( res[ key ]) {
                res[ key ] = [ ...res[ key ], ...local[ key ] ]
            } else {
                res[ key ] = local[ key ]
            }
        })

        // Filter unique
        Object.keys( res ).forEach( key => {
            res[ key ] = res[ key ].filter( filterUnique )
        })

        return res
    }

    return global
}

export
function pathHas
( config: IConfig | null | undefined, path: string | undefined, sub: keyof IPathConfig ): IPathConfig[ typeof sub ] | undefined
{
    if ( !path || !config ) {
        return undefined
    }

    return config?.paths[ path ][ sub ]
}

function joinExts
( ...args: string[][][]): string[]
{
    const res: string[] = []

    args.forEach( listOfArrays => {
        listOfArrays.forEach( listOfExts => {
            listOfExts.forEach( ext => {
                const value = ext.toLocaleLowerCase()

                if ( !res.includes( value )) {
                    res.push( value )
                }
            })
        })
    })

    return res
}

export
function isAllowed
( config: IConfig | null | undefined, type: string, filename?: string, folder?: string ): boolean
{
    const ext     = getExt( filename )
    const fullExt = getFullExt( filename )

    const mimes = getAllowedMimes( config, folder )

    if ( mimes.includes( type ) || isExtAllowed( config, folder, [ ext, fullExt ])) {
        return true
    }

    // TODO: Wildcard types, etc audio/*
    return false
}

function isExtAllowed
( config: IConfig | null | undefined, path: string | undefined, exts: string[]): boolean
{
    const allowed = getAllowedExts( config, path )
    return allowed.some( ext => exts.includes( ext ) || exts.includes( ext.replace( /^\./, '' )))
}

function
getAllowedMimes
( config?: IConfig | null, path?: string ): string[]
{
    if ( !config ) {
        return []
    }

    const global = Object.keys( config.global.accept || {})
    const local  = pathHas( config, path, 'accept' )

    if ( local ) {
        return [ ...global, ...Object.keys( local ) ]
    }

    return global
}

function getAllowedExts
( config?: IConfig | null, path?: string ): string[]
{
    if ( !config ) {
        return []
    }

    const global = Object.values( config.global.accept || [])
    const local  = pathHas( config, path, 'accept' )

    if ( local ) {
        return joinExts( global, Object.values( local ))
    }

    return joinExts( global )
}
