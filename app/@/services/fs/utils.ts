import type { ITopPathInfo } from './types'

import { universalPath } from '~/shared/lib/utils/path'

export
function relativePath
( top: ITopPathInfo, path: string ): string
{
    return universalPath( path ).replace( top.path, '' )
}
