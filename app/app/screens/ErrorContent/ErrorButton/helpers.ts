import type { TErrorAction } from '../lib/types'

import { defaultButtonText, errorButtons } from './consts'

export
function getErrorButtonText
( action?: TErrorAction ): string
{
    if ( !action ) {
        return defaultButtonText
    }

    const text = errorButtons[ action ]

    if ( !text ) {
        return defaultButtonText
    }

    return text
}
