import { useErrorContent } from '@/screens/ErrorContent/lib/useErrorContent'

import { useErrorStoreData } from '~/shared/stores/error'

export
function ErrorText
()
{
    const { code }           = useErrorStoreData()
    const { title, content } = useErrorContent( code )

    return (
        <>
            <h1>{ title }</h1>
            <p>{ content }</p>
        </>
    )
}
