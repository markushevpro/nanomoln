export
function extractRequestData
( path: string ): { action: string, query: URLSearchParams }
{
    const split  = path.split( '?' )
    const action = split[ 0 ]
    const query  = new URLSearchParams( split[ 1 ])

    return {
        action,
        query
    }
}
