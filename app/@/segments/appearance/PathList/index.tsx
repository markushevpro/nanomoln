import { usePathList } from './hooks'

import { FileRow } from '~/segments/elements/FileRow'
import { List }    from '~/shared/ui-kit/List'

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
