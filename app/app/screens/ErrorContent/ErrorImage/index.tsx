import { useErrorStoreData } from '~/shared/stores/error'

import { useErrorContent } from '../lib/useErrorContent'

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
