import type { IListDnDPayload } from '../types'
import type { RefObject }       from 'react'
import type { ISelection }      from '~/shared/lib/hooks/useSelection'

import { useRef }           from 'react'
import { useDrag, useDrop } from 'react-dnd'

function asPaths
( list: string[]): IListDnDPayload[]
{
    return list.map( path => ({ path }))
}

interface IUseDnDResult
{
    ref: RefObject<HTMLTableRowElement>
    isDragging: boolean
    isOver: boolean
}

export
function useDnDList
(
    type: string,
    data: IListDnDPayload,
    selection?: ISelection<string>,
    onDrop?: ( source: string[], target: string ) => void
): IUseDnDResult
{
    const ref = useRef<HTMLTableRowElement>( null )

    const [ { isDragging }, drag ] = useDrag<IListDnDPayload[], unknown, { isDragging: boolean }>(
        () => ({
            type,
            item:    () => selection?.selected && selection?.selected?.length > 0 ? asPaths( selection.selected ) : [ data ],
            canDrag: () => { return !!data.drag },
            collect: ( monitor ) => ({ isDragging: !!monitor.isDragging() })
        }),
        [ selection ]
    )

    const [ { isOver, canDrop }, drop ] = useDrop<IListDnDPayload[], unknown, { isOver: boolean, canDrop: boolean }>(
        () => ({
            accept:  type,
            canDrop: ( items ) => {
                return !!data.drop && !items.find( item => item.path === data.path )
            },
            drop: ( items ) => {
                if ( data.path ) {
                    onDrop?.( items.map( item => item.path ?? '' ), data.path )
                }
            },
            collect: ( monitor ) => ({
                isOver:  !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        })
    )

    drop( drag( ref ))

    return {
        ref,
        isDragging,
        isOver: canDrop && isOver
    }
}
