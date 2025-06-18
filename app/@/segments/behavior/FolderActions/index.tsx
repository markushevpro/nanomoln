import { ActionIcon }          from '@mantine/core'
import { IconFolderFilled }    from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { RefreshButton } from '@/segments/behavior/RefreshButton'
import { Uploader }      from '@/segments/behavior/Uploader'

import { useFolder } from '~/services/folder/hooks/useFolder'

export
function FolderActions
()
{
    const { data, create }      = useFolder()
    const [ visible, $visible ] = useState<boolean>( false )

    useEffect(() => {
        $visible( true )
    }, [])

    if ( !visible || !data ) {
        return null
    }

    return (
        <>
            <RefreshButton />
            <Uploader />

            <ActionIcon c="primary.0" size="lg" onClick={create}>
                <IconFolderFilled size="20" />
            </ActionIcon>
        </>
    )
}
