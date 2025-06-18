import Cookies from 'cookies'

class ServerCookies {
    _cookies: Cookies

    constructor
    ( context: GetServerSidePropsContext )
    {
        this._cookies = new Cookies( context.req, context.res )
    }

    load
    ( key: string ): string | null
    {
        return this._cookies.get( key ) ?? null
    }

    save
    ( key: string, value: string, options?: Cookies.SetOption ): void
    {
        this._cookies.set( key, value, options )
    }

    remove
    ( key: string ): void
    {
        this._cookies.set( key, '' )
    }
}

export
function getServerCookies
( context: GetServerSidePropsContext ): ServerCookies
{
    return new ServerCookies( context )
}

export
function
readServerCookies
( context: GetServerSidePropsContext, keys: string[]): ( string | null )[]
{
    const res: ( string | null )[] = []
    const cookie                   = getServerCookies( context )

    keys.forEach( key => {
        res.push( cookie.load( key ))
    })

    return res
}

export default
ServerCookies
