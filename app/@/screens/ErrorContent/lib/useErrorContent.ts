import type { IErrorContent } from './types'

import { getErrorContent } from './helpers'

export
function useErrorContent
( code?: number ): IErrorContent
{
    const data = getErrorContent( code )

    return data
}
