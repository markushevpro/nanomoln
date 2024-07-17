import type { IConfig } from '.'

import { createContext } from 'react'

const ConfigContext  = createContext<IConfig | undefined | null>( undefined )
const ConfigProvider = ConfigContext.Provider

export { ConfigContext, ConfigProvider }
