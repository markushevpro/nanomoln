import crypto from 'crypto'

// TODO: Not a service?

class HashService
{
    get
    ( str: string ): string
    {
        return (
            crypto
                .createHash( 'sha1' )
                .update( str )
                .digest( 'hex' )
        )
    }
}

export
const hashService = new HashService()
