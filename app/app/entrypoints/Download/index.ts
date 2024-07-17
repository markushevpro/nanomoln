import fs from 'fs'

import { createReadableStreamFromReadable, type LoaderFunctionArgs } from '@remix-run/node'

import { MIME_TYPES }                     from './consts'
import { getPathFromHash, pathIsAllowed } from './helpers'

export
async function loader
({ request }: LoaderFunctionArgs ): Promise<Response>
{
    const params = new URLSearchParams( request.url.split( '?' ).pop() ?? '' )
    const file   = params.get( 'file' ) ?? ''
    const hash   = params.get( 'hash' )

    if ( !pathIsAllowed( hash )) {
        return new Response( 'Access denied', { status: 403 })
    }

    const path = getPathFromHash( hash, file )

    if ( !path || !fs.existsSync( path )) {
        return new Response( 'Not found', { status: 404 })
    }

    const content  = createReadableStreamFromReadable( fs.createReadStream( path, { highWaterMark: 10000 }))
    const filename = path.split( '/' ).pop() ?? ''
    const mime     = MIME_TYPES[ filename.split( '.' ).pop()?.toLocaleLowerCase() ?? '' ] || MIME_TYPES.default

    return new Response( content, {
        headers: {
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Type':        mime
        }
    })
}
