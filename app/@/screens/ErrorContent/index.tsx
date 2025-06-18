import { Center } from '@mantine/core'

import { ErrorButton } from './ErrorButton'
import { ErrorImage }  from './ErrorImage'
import { ErrorText }   from './ErrorText'

import { useErrorStoreData } from '~/shared/stores/error'

export
function ErrorContent
()
{
    const { code } = useErrorStoreData()

    if ( !code ) {
        return null
    }

    return (
        <Center
            style={{
                flexDirection: 'column',
                height:        'calc(100dvh - calc(6rem* var(--mantine-scale)))'
            }}
        >
            <ErrorImage />
            <ErrorText />
            <ErrorButton />
        </Center>
    )
}
