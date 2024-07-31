import type { FileRejection } from '@mantine/dropzone'

import { Dropzone }                                  from '@mantine/dropzone'
import { useCallback, useContext, useRef, useState } from 'react'

import { ConfigContext }        from '~/services/config/context'
import { getAccept, isAllowed } from '~/services/config/helpers'
import { useFolder }            from '~/services/folder/hooks/useFolder'
import { filterUnique }         from '~/shared/lib/utils/arrays'

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

    const { data: folder }     = useFolder()
    const { upload, rejected } = useSmartUpload()

    const config = useContext( ConfigContext )
    const accept = getAccept( config, folder?.path ) ?? { accept: [ '*' ] }

    const [ active, $active ]   = useState<boolean>( true )
    const [ unknown, $unknown ] = useState<boolean>( false )
    const [ mimes, $mimes ]     = useState<string[]>([])

    const reset = useCallback(
        () => {
            $active( false )
            setTimeout(() => {
                $active( true )
            }, 100 )
        },
        []
    )

    const checkDrop = useCallback(
        ( accept: File[], reject: FileRejection[]) =>
        {
            clearDrag()

            // Dirty hack, in case of bug - if user drops an empty folder, dropzone locks whole screen
            if ( accept.length === 0 && reject.length === 0 ) {
                reset()
            }

            if ( reject.length > 0 ) {
                rejected( reject, () => {
                    if ( accept.length > 0 ) {
                        // Confirmation popup is hiding at this moment, so we need to wait for it
                        setTimeout(() => {
                            upload( accept )
                        }, 100 )
                    }
                })
            } else if ( accept.length > 0 ) {
                upload( accept )
            }
        },
        [ reset, rejected, upload ]
    )

    const isRejected = useCallback(
        ( item: DataTransferItem ) => (
            item.type !== '' &&
            !isAllowed( config, item.type, undefined, folder?.path )
        ),
        [ folder, config ]
    )

    const checkDrag = useCallback(
        ( event: React.DragEvent<HTMLElement> ) => {
            const items = Array.from( event.dataTransfer.items ).filter( item => item.kind === 'file' )

            if ( items.find( item => item.type === '' )) {
                $unknown( true )
            }

            $mimes( items.filter( isRejected ).map( item => item.type ).filter( filterUnique ))
        },
        [ isRejected ]
    )

    const clearDrag = () => {
        $unknown( false )
    }

    // Another dirty hack due Dropzone not allowing empty onDrop
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const ignore = useCallback(( files: File[] | undefined ) => {}, [])

    return (
        <>
            {
                active && (
                    <Dropzone.FullScreen
                        active
                        accept={accept}
                        className={styles.root}
                        openRef={openRef}
                        onDragEnter={checkDrag}
                        onDragLeave={clearDrag}
                        onDrop={ignore}
                        onDropAny={checkDrop}
                    >
                        <Dropzone.Accept>
                            <AcceptContent />
                        </Dropzone.Accept>

                        <Dropzone.Reject>
                            <RejectContent mimes={mimes} unknown={unknown} />
                        </Dropzone.Reject>
                    </Dropzone.FullScreen>
                )
            }

            <UploadIcon onClick={() => openRef.current?.()} />
        </>
    )
}
