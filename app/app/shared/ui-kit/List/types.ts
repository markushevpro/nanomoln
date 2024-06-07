import type { ReactNode, JSXElementConstructor } from 'react'
import type { ISelection }                       from '~/shared/lib/hooks/useSelection'

export interface IListItemData {
    text: string
    link?: string
    draft?: boolean
    info?: ReactNode
    actions?: ReactNode
    selectable?: boolean
    showIcon?: boolean
    icon?: ReactNode
    acceptDrop?: boolean
    path?: string
}

export interface IListItem extends IListItemData {
    key: string
}

export
interface IListDnDPayload {
    path?: string
    drag?: boolean
    drop?: boolean
}

export
interface IListItemContentProps
{
    item: IListItemData
    checked?: boolean
    onToggle?: ( state: boolean ) => void
    onSave?: ( value: string ) => void
}

export
interface IListConfig
{
    showIcons?: boolean
    selectable?: boolean
    draggable?: boolean
    locked?: string[]
}

export
interface IListItemProps
    extends IListItemContentProps
{
    component: JSXElementConstructor<IListItemContentProps>
    draggable?: boolean
    locked?: boolean
    selection?: ISelection<string>
    onDrop?: ( source: string[], target: string ) => void
}
