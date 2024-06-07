import { useCallback, useMemo, useState } from 'react'

import { filterUnique } from '../utils/arrays'

export
interface ISelection<T> {
    selected: T[]
    empty: boolean
    onSelect: ( item: T | T[]) => void
    isSelected: ( item: T ) => boolean
    set: ( value: T[]) => void
    reset: () => void
}

export
function useSelection
<T>
( initial: T[]): ISelection<T>
{
    const [ selected, $selected ] = useState<T[]>( initial )

    const empty = useMemo(() => selected.length < 1, [ selected ])

    const update = useCallback(
        ( handler: ( list: T[]) => T[]) =>
        {
            $selected( handler([ ...selected ]))
        },
        [ selected ]
    )

    const exclude = useCallback(
        ( value: T ) =>
        {
            update(( list: T[]) => {
                list.splice( list.indexOf( value ), 1 )
                return list
            })
        },
        [ update ]
    )

    const include = useCallback(
        ( value: T ) =>
        {
            update(( list: T[]) => {
                list.push( value )
                return list
            })
        },
        [ update ]
    )

    const multiselect = useCallback(
        ( value: T[]) =>
        {
            if ( selected.includes( value[ 0 ])) {
                $selected( selected.filter( item => !value.includes( item )))
            } else {
                $selected([
                    ...selected,
                    ...value
                ].filter( filterUnique ))
            }
        },
        [ selected ]
    )

    const onSelect = useCallback(
        ( value: T | T[]) =>
        {
            if ( Array.isArray( value )) {
                multiselect( value )
            } else {
                selected.includes( value )
                    ? exclude( value )
                    : include( value )
            }
        },
        [ selected, exclude, include, multiselect ]
    )

    const isSelected = useCallback(
        ( id: T ) => !!selected?.includes( id ),
        [ selected ]
    )

    const reset = useCallback(
        () =>
        {
            $selected([])
        },
        []
    )

    return useMemo(
        () => ({
            selected,
            empty,
            onSelect,
            isSelected,
            reset,
            set: $selected
        }),
        [ selected, empty, onSelect, isSelected, reset ]
    )
}
