import { useEffect, type PropsWithChildren } from 'react'

import { ErrorContent }         from '~/screens/ErrorContent'
import { PageLayout }           from '~/segments/appearance/PageLayout'
import { useAuth }              from '~/services/auth/useAuth'
import { PROTECTION_ERROR }     from '~/services/error/consts'
import { useErrorStoreActions } from '~/shared/stores/error'

export
function Protection
({ children }: PropsWithChildren )
{
    const { auth } = useAuth()
    const { set }  = useErrorStoreActions()

    useEffect(() => {
        if ( auth === false ) {
            set( PROTECTION_ERROR )
        }
    }, [ set, auth ])

    if ( auth === undefined ) {
        return null
    }

    if ( auth ) {
        return children
    }

    return (
        <PageLayout>
            <ErrorContent />
        </PageLayout>
    )
}
