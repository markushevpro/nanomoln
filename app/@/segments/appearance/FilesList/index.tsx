import { useFilesList } from './hooks/useFilesList'

import { SelectionActions }  from '~/segments/behavior/SelectionActions'
import { FileRow }           from '~/segments/elements/FileRow'
import { useFilesStoreData } from '~/services/files/store'
import { useFilesHandlers }  from '~/services/folder/hooks/useFilesHandlers'
import { List }              from '~/shared/ui-kit/List'

export
function FilesList
()
{
    const { list, selection } = useFilesList()
    const { locked }          = useFilesStoreData()
    const handlers            = useFilesHandlers()

    return (
        <List
            component={FileRow}
            data={list}
            selection={selection}
            selectionActions={<SelectionActions selection={selection} />}
            config={{
                draggable:  true,
                selectable: true,
                locked
            }}
            onChange={handlers.rename}
            onDrop={handlers.move}
        />
    )
}
