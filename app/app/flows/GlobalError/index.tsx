import { useEffect, type PropsWithChildren, type ReactNode } from 'react'

import { ErrorFlow }            from '~/flows/Error'
import { CONFIG_ERROR }         from '~/services/error/consts'
import { useErrorStoreActions } from '~/shared/stores/error'

interface IGlobalErrorProps
    extends PropsWithChildren
{
    value?: unknown
}

export
function GlobalError
({ value, children }: IGlobalErrorProps ): ReactNode
{
    const { set } = useErrorStoreActions()

    useEffect(() => {
        set( CONFIG_ERROR )
    }, [ set ])

    if ( value ) {
        return <ErrorFlow />
    }

    return children
}
