import type { IListItem, IListItemData } from '../types'
import type { ISelection }               from '~/shared/lib/hooks/useSelection'

import { useCallback } from 'react'

export
interface IListHandlers
{
    change: ( item: IListItem ) => ( val: string ) => void
    drop: ( source: string[], target: string ) => void
    select: ( path?: string ) => () => void
    selectAll: () => void
    isSelected?: ISelection<string>['isSelected']
}

export
function useListHandlers
(
    data: IListItem[],
    selection?: ISelection<string>,
    onChange?: ( item: IListItemData, name: string ) => Promise<void>,
    onDrop?: ( source: string[], target: string ) => Promise<void>

): IListHandlers
{
    const { isSelected, onSelect } = selection ?? {}

    const handleSelect = useCallback(
        ( path?: string ) => () => {
            if ( path ) {
                onSelect?.( path )
            }
        },
        [ onSelect ]
    )

    const handleSelectAll = useCallback(
        () => {
            onSelect?.( data.filter( item => !!item.path ).map( item => item.path ?? '' ))
        },
        [ onSelect, data ]
    )

    const handleChange = useCallback(
        ( item: IListItemData ) => ( name: string ) => {
            void onChange?.( item, name )
        },
        [ onChange ]
    )

    const handleDrop = useCallback(
        ( source: string[], target: string ) => {
            void onDrop?.( source, target )
        },
        [ onDrop ]

    )

    return {
        change:    handleChange,
        drop:      handleDrop,
        isSelected,
        select:    handleSelect,
        selectAll: handleSelectAll
    }
}
