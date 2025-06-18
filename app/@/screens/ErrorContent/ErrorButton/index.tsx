import { Button } from '@mantine/core'

import { useErrorContent } from '@/screens/ErrorContent/lib/useErrorContent'

import { useErrorButton } from './useErrorButton'

import { useErrorStoreData } from '~/shared/stores/error'

export
function ErrorButton
()
{
    const { code }          = useErrorStoreData()
    const { action }        = useErrorContent( code )
    const { text, handler } = useErrorButton( action )

    if ( !action || action === 'none' ) {
        return null
    }

    return (
        <Button onClick={handler}>{ text }</Button>
    )
}
