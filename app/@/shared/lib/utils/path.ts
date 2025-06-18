export
function universalPath
( path: string ): string
{
    return path.replace( /[\\]+/g, '/' )
}

export
function getFileName
( filename: string | undefined ): string
{
    return filename?.split( '.', 1 ).pop() ?? ''
}

export
function getExt
( filename: string | undefined ): string
{
    return filename?.split( '.' ).pop() ?? ''
}

export
function getFullExt
( filename: string | undefined ): string
{
    const ext = getFileName( filename )
    return filename?.replace( ext, '' ) ?? ''
}
