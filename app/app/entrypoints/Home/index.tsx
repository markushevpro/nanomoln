import { MainFlow }       from '~/flows/Main'
import { ConfigProvider } from '~/services/config/context'
import { meta }           from '~/shared/lib/default-meta'

import { useInitialData } from './hooks'
import { loader }         from './loader'

export { loader, meta }

export
function HomePage
()
{
    const { config } = useInitialData()

    return (
        <ConfigProvider value={config}>
            <MainFlow />
        </ConfigProvider>
    )
}
