import type { IListItemProps } from '@/shared/ui-kit/List/types'

import { DraggableListItem } from './draggable'
import { StaticListItem }    from './static'

export
function ListItem
({ draggable, ...props }: IListItemProps )
{
    return draggable
        ? <DraggableListItem {...props} />
        : <StaticListItem {...props} />
}
