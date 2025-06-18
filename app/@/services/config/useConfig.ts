import { useContext, useMemo } from 'react'

import type { IConfig } from './types'

import { ConfigContext } from './context'

export
function useConfig
(): IConfig | null | undefined
{
    const config = useContext( ConfigContext )

    return useMemo(() => config, [ config ])
}
