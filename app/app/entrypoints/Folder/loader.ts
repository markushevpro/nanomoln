import type { LoaderFunctionArgs } from '@remix-run/node'
import type { IWithConfig }        from '~/services/config/helpers'
import type { IFilesStoreData }    from '~/shared/stores/files'

import { withConfig } from '~/services/config/helpers'

import { getFolderInfo, getPaths } from './helpers'

interface IFolderData
{
    data: IFilesStoreData
}

export
async function loader
({ params }: LoaderFunctionArgs ): Promise<IFolderData & IWithConfig>
{
    const { paths, target } = getPaths( params )

    if ( !target ) {
        console.log( 'NOT FOUND' )
        // TODO: 404
        return withConfig<IFolderData>({
            data: {
                locked:    [],
                temporary: []
            }
        })
    }

    return withConfig<IFolderData>({ data: await getFolderInfo( paths, target, params[ '*' ]) })
}
