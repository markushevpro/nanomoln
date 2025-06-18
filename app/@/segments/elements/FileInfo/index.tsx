import type { IFileInfo } from '~/services/fs/types'

import { formatItems } from './helpers'

import { InfoList } from '~/shared/ui-kit/InfoList'

interface IFileInfoProps
{ data: IFileInfo }

export
function FileInfo
({ data }: IFileInfoProps )
{
    return (
        <InfoList items={formatItems( data )} />
    )
}
