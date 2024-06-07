import { FileRow } from '~/segments/elements/FileRow'
import { List }    from '~/shared/ui-kit/List'

import { usePathList } from './hooks'

export
function PathList
()
{
    const { list } = usePathList()

    return (
        <List
            component={FileRow}
            config={{ showIcons: false }}
            data={list}
        />
    )
}
