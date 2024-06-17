import { useErrorStoreData } from '~/shared/stores/error'

import { useErrorContent } from '../lib/useErrorContent'

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
