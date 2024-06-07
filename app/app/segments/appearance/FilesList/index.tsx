import { SelectionActions }  from '~/segments/behavior/SelectionActions'
import { FileRow }           from '~/segments/elements/FileRow'
import { useFilesHandlers }  from '~/services/folder/hooks/useFilesHandlers'
import { useFilesStoreData } from '~/shared/stores/files'
import { List }              from '~/shared/ui-kit/List'

import { useFilesList } from './hooks/useFilesList'

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
