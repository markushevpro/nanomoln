import { useErrorContent } from '@/screens/ErrorContent/lib/useErrorContent'

import { useErrorStoreData } from '~/shared/stores/error'

export
function ErrorImage
()
{
    const { code }  = useErrorStoreData()
    const { image } = useErrorContent( code )

    if ( !image ) {
        return null
    }

    return (
        <img alt="" src={image} />
    )
}
