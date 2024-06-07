import { configService } from '~/services/config'
import { hashService }   from '~/services/hash'

export
function pathIsAllowed
( hash: string | null ): boolean
{
    if ( !hash ) {
        return false
    }

    const config    = configService.get()
    const { paths } = config

    const allowed = paths.some(( top ) => hashService.get( top ) === hash )

    return allowed
}

export
function getPathFromHash
( hash: string | null, file: string | null ): string | undefined
{
    if ( !hash || !file ) {
        return
    }

    const config    = configService.get()
    const { paths } = config

    const top = paths.find(( top ) => hashService.get( top ) === hash )

    if ( !top ) {
        return
    }

    return `${top}/${file}`.replace( /[/]+/g, '/' )
}
