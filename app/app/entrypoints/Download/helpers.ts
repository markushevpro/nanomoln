import fs from 'fs'

import { configService } from '~/services/config'
import { hashService }   from '~/services/hash'
import { universalPath } from '~/shared/lib/utils/path'

export
function pathIsAllowed
( hash: string | null ): boolean
{
    if ( !hash ) {
        return false
    }

    const { config } = configService.get()
    const paths      = config?.paths ?? []

    const allowed = paths?.some(( top ) => hashService.get( top ) === hash )

    return allowed
}

export
function getPathFromHash
( hash: string | null, file: string | null ): string | undefined
{
    if ( !hash || !file ) {
        return
    }

    const { config } = configService.get()
    const paths      = config?.paths ?? []

    const top = paths.find(( top ) => hashService.get( top ) === hash )

    if ( !top ) {
        return
    }

    return universalPath( `${top}/${file}` )
}

export
function createSymlink
( path: string, file: string ): void
{
    const dest = `${process.cwd()}/public/tmp`

    if ( !fs.existsSync( dest )) {
        fs.mkdirSync( dest )
    }

    const destFile = `${dest}${file}`

    if ( !fs.existsSync( destFile )) {
        fs.symlinkSync( path, destFile, 'file' )
    }
}
