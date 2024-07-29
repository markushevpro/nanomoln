import type { FileRejection } from '@mantine/dropzone'

import { Dropzone }                                  from '@mantine/dropzone'
import { useCallback, useContext, useRef, useState } from 'react'

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

    const [ active, $active ]   = useState<boolean>( true )
    const [ unknown, $unknown ] = useState<boolean>( false )

    const reset = useCallback(
        () => {
            $active( false )
            setTimeout(() => {
                $active( true )
            }, 100 )
        },
        []
    )

    // Dirty hack, in case of bug - if user drops an empty folder, dropzone locks whole screen
    const checkEmptyDrop = useCallback(
        ( accept: File[], reject: FileRejection[]) =>
        {
            clearUnknown()
            if ( accept.length === 0 && reject.length === 0 ) {
                reset()
            }
        },
        [ reset ]
    )

    const checkUnknown = ( event: React.DragEvent<HTMLElement> ) => {
        if ( Array.from( event.dataTransfer.items ).find( item => item.type === '' )) {
            $unknown( true )
        }
    }

    const clearUnknown = () => {
        $unknown( false )
    }

    return (
        <>
            {
                active && (
                    <Dropzone.FullScreen
                        active
                        accept={accept}
                        className={styles.root}
                        openRef={openRef}
                        onDragEnter={checkUnknown}
                        onDragLeave={clearUnknown}
                        onDrop={upload}
                        onDropAny={checkEmptyDrop}
                    >
                        <Dropzone.Accept>
                            <AcceptContent />
                        </Dropzone.Accept>

                        <Dropzone.Reject>
                            <RejectContent unknown={unknown} />
                        </Dropzone.Reject>
                    </Dropzone.FullScreen>
                )
            }

            <UploadIcon onClick={() => openRef.current?.()} />
        </>
    )
}
