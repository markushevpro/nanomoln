import type { MantineSize } from '@mantine/core'
import type { IFileInfo }   from '~/services/fs/types'

import { ActionIcon }   from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'

import { useFilesStoreData } from '~/shared/stores/files'

import { getRelative } from './helpers'

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
            window.open( `/api/download?hash=${top.hash}&file=${getRelative( top, file )}` )
            // const a = document.createElement( 'a' )

            // a.download = file.filename
            // a.href     = `/api/download?hash=${top.hash}&file=${file.relative}`
            // a.target   = '_blank'

            // a.click()
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
