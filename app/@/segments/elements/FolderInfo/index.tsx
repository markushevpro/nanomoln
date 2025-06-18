import type { IPathInfo } from '~/services/fs/types'

import { formatItems } from './helpers'

import { InfoList } from '~/shared/ui-kit/InfoList'

interface IFolderInfoProps
{ data: IPathInfo }

export
function FolderInfo
({ data }: IFolderInfoProps )
{
    return (
        <InfoList items={formatItems( data )} />
    )
}
