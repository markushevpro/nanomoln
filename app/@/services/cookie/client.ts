import BrowserCookies from 'js-cookie'

import { isBrowser } from '~/shared/lib/utils/browser'

class ClientCookieService {
    load
    ( key: string ): string | null
    {
        return isBrowser() ? BrowserCookies.get( key ) ?? null : null
    }

    save
    ( key: string, value: string ): void
    {
        isBrowser() && BrowserCookies.set( key, value )
    }

    remove
    ( key: string ): void
    {
        isBrowser() && BrowserCookies.remove( key )
    }
}

const cookies = new ClientCookieService()

export
{ cookies }
