import { Button } from '@mantine/core'

import { useErrorStoreData } from '~/shared/stores/error'

import { useErrorContent } from '../lib/useErrorContent'

import { useErrorButton } from './useErrorButton'

export
function ErrorButton
()
{
    const { code }          = useErrorStoreData()
    const { action }        = useErrorContent( code )
    const { text, handler } = useErrorButton( action )

    if ( !action ) {
        return null
    }

    return (
        <Button onClick={handler}>{ text }</Button>
    )
}
