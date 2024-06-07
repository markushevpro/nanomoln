import type { TypedResponse } from '@remix-run/node'
import type { IWithConfig }   from '~/services/config/helpers'
import type { ITopPathInfo }  from '~/services/fs/types'

import { redirect } from '@remix-run/node'

import { configService } from '~/services/config'
import { withConfig }    from '~/services/config/helpers'
import { fsService }     from '~/services/fs/service'

interface IHomePageData
{
    data: {
        paths: ITopPathInfo[]
    }
}

export
async function loader
(): Promise<IHomePageData & IWithConfig | TypedResponse<never>>
{
    const paths = fsService.path.infoList( configService.getPaths())

    if ( paths.length === 1 ) {
        return redirect( `/view/${paths[ 0 ].hash}` )
    }

    return withConfig<IHomePageData>({ data: { paths } })
}
