import type { TErrorAction } from '../lib/types'

import { useNavigate } from '@remix-run/react'
import { useMemo }     from 'react'

import { getErrorButtonText } from './helpers'

interface IUseErrorButtonResult
{
    text: string
    handler: () => void
}

export
function useErrorButton
( action?: TErrorAction ): IUseErrorButtonResult
{
    const navigate = useNavigate()

    const text = useMemo(() => getErrorButtonText( action ), [ action ])

    const handler = useMemo(
        () => {
            switch ( action ) {
                case 'home':
                    return () => {
                        navigate( '/' )
                    }

                case 'reload':
                    return () => {
                        window.location.reload()
                    }

                default:
                    return () => {
                    // Do nothing
                    }
            }
        },
        [ action, navigate ]
    )

    return useMemo(() => ({
        text,
        handler
    }), [ text, handler ])
}
