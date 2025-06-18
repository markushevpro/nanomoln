import { createContext } from 'react'

import type { IConfig } from './types'

const ConfigContext  = createContext<IConfig | undefined | null>( undefined )
const ConfigProvider = ConfigContext.Provider

export
{ ConfigContext, ConfigProvider }
