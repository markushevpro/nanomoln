import type { ActionFunctionArgs } from '@remix-run/node'

import { generateErrorProps }                              from '~/services/error'
import { folderApi }                                       from '~/services/server/folder'
import { getApiPath, getTopLevel, getPathWithoutTopLevel } from '~/services/url'

import { extractRequestData } from './helpers'

export
async function action
({ request }: ActionFunctionArgs ): Promise<unknown>
{
    const path = getApiPath( request )

    if ( !path ) {
        return generateErrorProps( 'No path' )
    }

    const topLevel = getTopLevel( path )
    const all      = getPathWithoutTopLevel( path )

    const { action, query } = extractRequestData( all )

    switch ( topLevel?.toLocaleLowerCase()) {
        case 'folders':
            return await folderApi({
                action,
                request,
                query
            })

        default:
            return generateErrorProps( `No handler for "${topLevel}", fullpath: ${path}` )
    }
}
