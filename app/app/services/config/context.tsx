import type { IConfig } from '.'

import { createContext } from 'react'

const ConfigContext  = createContext<IConfig | undefined>( undefined )
const ConfigProvider = ConfigContext.Provider

export { ConfigContext, ConfigProvider }
