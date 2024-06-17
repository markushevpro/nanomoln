import { useEffect } from 'react'

import { ErrorFlow }            from '~/flows/Error'
import { useErrorStoreActions } from '~/shared/stores/error'

export
function ErrorPage
()
{
    const { set } = useErrorStoreActions()

    useEffect(() => {
        set( 404 )
    }, [ set ])

    return <ErrorFlow />
}
