import type { IErrorContent } from './types'

import { errorContent, unknownError } from './const'

export
function getErrorContent
( code?: number ): IErrorContent
{
    if ( !code ) {
        return unknownError
    }

    const data = errorContent[ code ]

    if ( !data ) {
        return unknownError
    }

    return data
}
