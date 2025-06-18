import type { ActionFunctionArgs } from '@remix-run/node'

export
function getApiPath
( request: ActionFunctionArgs['request']): string | undefined
{
    return request.url.split( '/api/' ).pop()
}

export
function getPathWithoutTopLevel
( path: string ): string
{
    return path.split( '/' ).slice( 1 ).join( '/' )
}

export
function getTopLevel
( path: string ): string | undefined
{
    return path.split( '/' ).shift()
}
