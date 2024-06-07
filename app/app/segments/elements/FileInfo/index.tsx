import type { IFileInfo } from '~/services/fs/types'

import { InfoList } from '~/shared/ui-kit/InfoList'

import { formatItems } from './helpers'

interface IFileInfoProps
{
    data: IFileInfo
}

export
function FileInfo ({ data }: IFileInfoProps )
{
    return (
        <InfoList items={formatItems( data )} />
    )
}
