import type { IListItemProps } from '../../types'

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
