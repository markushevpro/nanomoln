import { redirect  } from '@remix-run/node'

import type { LoaderFunctionArgs } from '@remix-run/node'

import { getPathFromHash, pathIsAllowed } from './helpers'

import { fsService } from '~/services/fs/service'

export
async function loader
({ request }: LoaderFunctionArgs ): Promise<Response>
{
    const params = new URLSearchParams( request.url.split( '?' ).pop() ?? '' )
    const file   = params.get( 'file' )
    const hash   = params.get( 'hash' )

    if ( !file ) {
        return new Response( 'File is not provided', { status: 400 })
    }

    if ( !pathIsAllowed( hash )) {
        return new Response( 'Access denied', { status: 403 })
    }

    const path = getPathFromHash( hash, file )

    if ( !path || !fsService.path.exist( path )) {
        return new Response( 'Not found', { status: 404 })
    }

    fsService.file.createSymlink( path, file )

    return redirect( `/tmp${file}` )
}
