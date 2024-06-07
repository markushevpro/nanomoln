import type { IListConfig, IListItem, IListItemContentProps, IListItemData } from './types'
import type { JSXElementConstructor, ReactNode }                             from 'react'
import type { ISelection }                                                   from '~/shared/lib/hooks/useSelection'

import { DndProvider }  from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useListConfig }   from './hooks/useListConfig'
import { useListHandlers } from './hooks/useListHandlers'
import { ListView }        from './view'
import { ListHeader }      from './view/ListHeader'

interface IListProps
{
    data: IListItem[]
    config?: IListConfig
    selection?: ISelection<string>
    selectionActions?: ReactNode

    component: JSXElementConstructor<IListItemContentProps>

    onChange?: ( item: IListItemData, name: string ) => Promise<void>
    onDrop?: ( source: string[], target: string ) => Promise<void>
}

export
function List
({ data, component, config, selection, selectionActions, onChange, onDrop }: IListProps )
{
    const viewConfig = useListConfig( config )
    const handlers   = useListHandlers( data, selection, onChange, onDrop )

    const { selected, empty } = selection ?? {}

    const content = (
        <ListView
            component={component}
            config={viewConfig}
            data={data}
            handlers={handlers}
            selection={selection}
        >
            {
                selected && (
                    <ListHeader
                        selected={!empty}
                        selection={selected}
                        selectionActions={selectionActions}
                        total={data.length}
                        onSelectAll={handlers.selectAll}
                    />
                )
            }
        </ListView>
    )

    if ( viewConfig.draggable ) {
        return (
            <DndProvider backend={HTML5Backend}>
                { content }
            </DndProvider>
        )
    }

    return content
}
