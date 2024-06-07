import type { IBreadcrumb }                       from './types'
import type { IPathInfo, ITopPathInfo, IDirInfo } from '~/services/fs/types'

import { crumbPlaceholder } from './consts'

function extractHomeText
( parent?: IPathInfo ): string
{
    return parent?.path.split( '/' ).pop() ?? ''
}

function extractHome
( parent: ITopPathInfo ): IBreadcrumb
{
    return {
        link: `/view/${parent.hash}`,
        text: extractHomeText( parent ) ?? crumbPlaceholder
    }
}

export
function extractActive
( folder?: IPathInfo, top?: ITopPathInfo ): string
{
    return ( folder as IDirInfo )?.filename ?? extractHomeText( top ) ?? crumbPlaceholder
}

export
function extractParents
( parent?: ITopPathInfo, path?: IPathInfo ): IBreadcrumb[]
{
    if ( !parent || !path ) {
        return []
    }

    const res: IBreadcrumb[] = []

    const home  = extractHome( parent )
    const parts = path.relative.split( '/' )

    for ( let i = 1; i < parts.length; i++ ) {
        res.push({
            link: `${home.link}/${parts.slice( 0, i ).join( '/' )}`,
            text: parts[ i - 1 ] ?? crumbPlaceholder
        })
    }

    return [ home, ...res ]
}
