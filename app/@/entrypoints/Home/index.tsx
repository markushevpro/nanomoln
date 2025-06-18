import { useInitialData } from './hooks'
import { loader }         from './loader'

import { GlobalError }    from '~/flows/GlobalError'
import { MainFlow }       from '~/flows/Main'
import { Protection }     from '~/flows/Protection'
import { ConfigProvider } from '~/services/config/context'
import { meta }           from '~/shared/lib/default-meta'

export
{ loader, meta }

export
function HomePage
()
{
    const { config, error } = useInitialData()

    return (
        <GlobalError value={error}>
            <ConfigProvider value={config}>
                <Protection>
                    <MainFlow />
                </Protection>
            </ConfigProvider>
        </GlobalError>
    )
}
