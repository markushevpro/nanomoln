import type { MantineSize } from '@mantine/core'
import type { IFileInfo }   from '~/services/fs/types'

import { ActionIcon }   from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'

import { useFilesStoreData } from '~/services/files/store'
import { relativePath }      from '~/services/fs/utils'

interface IDownloadButtonProps
{
    file: IFileInfo
    size?: MantineSize
}

export
function DownloadButton
({ file, size }: IDownloadButtonProps )
{
    const { top } = useFilesStoreData()

    const download = () => {
        if ( top ) {
            window.location.href = `/api/download?hash=${top.hash}&file=${relativePath( top, file.path )}`
        }
    }

    return (
        <>
            <ActionIcon
                size={ size ?? 'lg' }
                variant='subtle'
                onClick={download}
            >
                <IconDownload size={20} />
            </ActionIcon>
        </>
    )
}
