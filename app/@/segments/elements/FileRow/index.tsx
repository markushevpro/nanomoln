import type { ReactNode }             from 'react'
import type { IListItemContentProps } from '~/shared/ui-kit/List/types'

import { FileCellSelect, FileCellIcon, FileCellContent, FileCellInfo, FileCellActions } from './cells'

export
function FileRow
({ item, checked, onToggle, onSave }: IListItemContentProps ): ReactNode
{
    return (
        <>
            <FileCellSelect
                checked={checked}
                visible={item.selectable}
                onToggle={onToggle}
            />

            <FileCellIcon visible={item.showIcon} {...item} />

            <FileCellContent
                visible
                {...item}
                onSave={onSave}
            />

            <FileCellInfo visible={!item.draft} {...item} actions={!!item.actions} />
            <FileCellActions visible={!item.draft} {...item} />
        </>
    )
}
