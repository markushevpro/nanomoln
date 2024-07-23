import type { LoaderFunctionArgs } from '@remix-run/node'

import fs from 'fs'

import { redirect  } from '@remix-run/node'

import { createSymlink, getPathFromHash, pathIsAllowed } from './helpers'

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

    createSymlink( path, file )

    return redirect( `/tmp${file}` )
}
