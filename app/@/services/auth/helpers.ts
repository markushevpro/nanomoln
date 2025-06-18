import type { IConfig } from '@/services/config/types'

export
function detectAuth
( config: IConfig | null | undefined ): boolean | undefined
{
    if ( !config ) {
        return undefined
    }

    if ( !config.passhash ) {
        return true
    }

    return false
}
