import type { IListConfig } from '@/shared/ui-kit/List/types'

export
function useListConfig
( initialConfig?: IListConfig ): IListConfig
{
    const { selectable, draggable, locked } = initialConfig ?? {}
    const showIcons                         = initialConfig?.showIcons === undefined ? true : initialConfig.showIcons

    return {
        draggable:  !!draggable,
        selectable: !!selectable,
        locked:     locked ?? [],
        showIcons
    }
}
