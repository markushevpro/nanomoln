import type { IConfig } from './types'

import { createContext } from 'react'

const ConfigContext  = createContext<IConfig | undefined | null>( undefined )
const ConfigProvider = ConfigContext.Provider

export { ConfigContext, ConfigProvider }
