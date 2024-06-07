import { MainFlow }       from '~/flows/Main'
import { ConfigProvider } from '~/services/config/context'
import { meta }           from '~/shared/lib/default-meta'

import { useFolderData } from './hooks'
import { loader }        from './loader'

export { loader, meta }

export
function FolderPage
()
{
    const { loaded, config } = useFolderData()

    return loaded
        ? (
            <ConfigProvider value={config}>
                <MainFlow />
            </ConfigProvider>
        )
        : null
}
