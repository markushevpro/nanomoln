import { FilesListScreen } from '~/screens/FilesList'
import { useFolder }       from '~/services/folder/hooks/useFolder'

export
function ViewFilesFlow
()
{
    const { data } = useFolder()

    return data
        ? (
            <FilesListScreen />
        )
        : null
}
