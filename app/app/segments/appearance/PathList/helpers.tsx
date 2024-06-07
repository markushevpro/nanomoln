import type { ITopPathInfo } from '~/services/fs/types'
import type { IListItem }    from '~/shared/ui-kit/List/types'

import { FolderInfo } from '~/segments/elements/FolderInfo'

export
function formatList
( paths?: ITopPathInfo[]): IListItem[]
{
    const res: IListItem[] = []

    if ( paths ) {
        paths.forEach( path => {
            res.push({
                key:  path.hash,
                text: `${path.path}`,
                link: `/view/${path.hash}`,
                info: <FolderInfo data={path} />
            })
        })
    }

    return res
}
