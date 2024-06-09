import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/node'

import { configService, DEFAULT_MAX_SIZE } from '~/services/config'

export
async function upload
( request: Request, query: URLSearchParams ): Promise<null>
{
    const target      = query.get( 'target' ) ?? undefined
    const { maxsize } = configService.get() ?? DEFAULT_MAX_SIZE

    const uploadHandler = unstable_composeUploadHandlers(

        async ({ name, contentType, data, filename }): Promise<undefined> => {
            if ( name === 'file' ) {
                if ( !configService.allow( contentType )) {
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
