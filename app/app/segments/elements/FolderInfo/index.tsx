import type { IPathInfo } from '~/services/fs/types'

import { InfoList } from '~/shared/ui-kit/InfoList'

import { formatItems } from './helpers'

interface IFolderInfoProps
{
    data: IPathInfo
}

export
function FolderInfo ({ data }: IFolderInfoProps )
{
    return (
        <InfoList items={formatItems( data )} />
    )
}
