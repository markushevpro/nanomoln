import { ViewFilesFlow }  from '~/flows/ViewFiles'
import { PathListScreen } from '~/screens/PathList'
import { PageLayout }     from '~/segments/appearance/PageLayout'
import { FolderActions }  from '~/segments/behavior/FolderActions'
import { useFolder }      from '~/services/folder/hooks/useFolder'

export
function MainFlow
()
{
    const { data } = useFolder()

    return (
        <PageLayout
            headerActions={(
                <FolderActions />
            )}
        >
            {
                ( data )
                    ? <ViewFilesFlow />
                    : <PathListScreen />
            }
        </PageLayout>
    )
}
