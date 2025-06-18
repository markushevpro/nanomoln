// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TServerApiHandler = ( payload: any, query: URLSearchParams ) => unknown
type TServerApiHandlers = Record<string, TServerApiHandler>

interface IApiPayload {
    action?: string
    request: Request
    query: URLSearchParams
}

export
function generateServerApi
( handlers: TServerApiHandlers, defaultHandler: TServerApiHandler )
{
    return (
        async ({ action, request, query }: IApiPayload ): Promise<unknown> => {
            const payload = request.headers.get( 'content-type' )?.includes( 'multipart/form-data' )
                ? request
                : await request.json()

            if ( !action || !handlers[ action ]) {
                return defaultHandler( payload, query )
            }

            return handlers[ action ]( payload, query )
        }
    )
}
