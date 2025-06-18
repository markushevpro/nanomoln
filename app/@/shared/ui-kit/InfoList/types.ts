import type { IconProps, Icon }                                     from '@tabler/icons-react'
import type { ForwardRefExoticComponent, RefAttributes, ReactNode } from 'react'

export
type TTableIcon = ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<Icon>>

export
interface IInfoListItemContent
{
    key: string
    icon?: TTableIcon
    content?: ReactNode
}

export
type IInfoListItem = IInfoListItemContent | false | null | undefined | '' | 0
