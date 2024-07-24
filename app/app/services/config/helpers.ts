import type { IConfig } from '.'

import { configService } from '.'

export
interface IWithConfig
{
    config: IConfig | null
    error: unknown
}

export
function withConfig
<T>
( object: T ): T & IWithConfig
{
    const { config, error } = configService.get()

    return {
        ...object,
        error: error ?? ( object as Record<string, unknown> ).error,
        config
    }
}
