import {
    unstable_composeUploadHandlers,
    unstable_createFileUploadHandler,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData
} from '@remix-run/node'

import { configService } from '~/services/config'

export
async function upload
( request: Request, query: URLSearchParams ): Promise<null>
{
    const target  = query.get( 'target' ) ?? undefined
    const maxsize = configService.getMaxSize( target )

    const uploadHandler = unstable_composeUploadHandlers(

        async ({ name, contentType, data, filename }): Promise<undefined> => {
            if ( name === 'file' ) {
                if ( !configService.allow( contentType, filename, target )) {
                    return
                }

                await unstable_createFileUploadHandler({
                    directory:          target,
                    avoidFileConflicts: false,
                    maxPartSize:        maxsize,
                    file:               ({ filename }) => filename
                })({
                    name,
                    contentType,
                    data,
                    filename
                })
            }
        },
        // fallback to memory for everything else
        unstable_createMemoryUploadHandler()
    )

    await unstable_parseMultipartFormData(
        request,
        uploadHandler
    )

    return null
}
