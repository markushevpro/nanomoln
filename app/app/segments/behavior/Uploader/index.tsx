import { Dropzone }           from '@mantine/dropzone'
import { useContext, useRef } from 'react'

import { ConfigContext } from '~/services/config/context'

import { AcceptContent }  from './components/AcceptContent'
import { RejectContent }  from './components/RejectContent'
import { UploadIcon }     from './components/UploadIcon'
import { useSmartUpload } from './hooks/useSmartUpload'
import styles             from './uploader.module.css'

export
function Uploader
()
{
    const openRef = useRef<() => void>( null )

    const { accept } = useContext( ConfigContext ) ?? { accept: [ '*' ] }
    const { upload } = useSmartUpload()

    return (
        <>
            <Dropzone.FullScreen
                active
                accept={accept}
                className={styles.root}
                openRef={openRef}
                onDrop={upload}
            >
                <Dropzone.Accept>
                    <AcceptContent />
                </Dropzone.Accept>

                <Dropzone.Reject>
                    <RejectContent />
                </Dropzone.Reject>
            </Dropzone.FullScreen>

            <UploadIcon onClick={() => openRef.current?.()} />
        </>
    )
}
