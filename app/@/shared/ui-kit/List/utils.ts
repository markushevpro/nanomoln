import type { IListDnDPayload, IListItemData } from './types'

export
function extractDnDData
( item: IListItemData ): IListDnDPayload
{
    return {
        path: item.path,
        drag: !item.draft,
        drop: item.acceptDrop
    }
}
