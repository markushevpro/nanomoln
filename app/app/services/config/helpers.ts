import type { IConfig } from '.'

import { configService } from '.'

export
interface IWithConfig
{
    config: IConfig
}

export
function withConfig
<T>
( object: T ): T & IWithConfig
{
    const config = configService.get()

    return {
        ...object,
        config
    }
}
