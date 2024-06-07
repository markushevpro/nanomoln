import type { IListHandlers }                                 from '../hooks/useListHandlers'
import type { IListConfig, IListItem, IListItemContentProps } from '../types'
import type { JSXElementConstructor, PropsWithChildren }      from 'react'
import type { ISelection }                                    from '~/shared/lib/hooks/useSelection'

import { Loader, ScrollArea, Table } from '@mantine/core'

import { ListItem } from './ListItem'
import styles       from './list.module.css'

interface IListViewProps
    extends PropsWithChildren
{
    data: IListItem[]
    selection?: ISelection<string>
    component: JSXElementConstructor<IListItemContentProps>
    config: IListConfig
    handlers: IListHandlers
}

export
function ListView
({ data, selection, component, config, children, handlers }: IListViewProps )
{
    const { selectable, draggable, locked } = config ?? {}

    const showIcons = config?.showIcons === undefined ? true : config.showIcons

    return (
        <ScrollArea>
            <Table
                highlightOnHover
                classNames={styles}
                horizontalSpacing="0"
                miw={800}
                verticalSpacing="sm"
            >
                { children }

                <Table.Tbody>
                    {
                        data.map(({ key, ...props }: IListItem ) => (
                            <ListItem
                                key={key}
                                checked={handlers.isSelected?.( key )}
                                component={component}
                                draggable={draggable}
                                locked={locked?.includes( props.path ?? '' )}
                                selection={selection}
                                item={{
                                    ...props,
                                    icon: (
                                        !props.icon && locked?.includes( props.path ?? '' )
                                            ? (
                                                <Loader color="gray" size="xs" />
                                            )
                                            : props.icon
                                    ),
                                    selectable,
                                    showIcon: showIcons
                                }}
                                onDrop={handlers.drop}
                                onToggle={handlers.select?.( props.path )}
                                onSave={handlers.change({
                                    key,
                                    ...props
                                })}
                            />
                        ))
                    }
                </Table.Tbody>
            </Table>
        </ScrollArea>
    )
}
