import type { LinkDescriptor } from '@remix-run/node'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import { Notifications }                      from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { cssBundleHref }                      from '@remix-run/css-bundle'
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from '@remix-run/react'

import '~/shared/styles/global.css'
// eslint-disable-next-line import/order
import { Popups }        from '~/shared/popups'
import { nanomolnTheme } from '~/shared/styles/theme'
import { GlobalLoader  } from '~/shared/ui-kit/GlobalLoader'

export
function links
(): LinkDescriptor[]
{
    return [
        ...( cssBundleHref
            ? [ {
                rel:  'stylesheet',
                href: cssBundleHref
            } ]
            : [])
    ]
}

export default
function App
()
{
    return (
        // eslint-disable-next-line react/no-unknown-property
        <html data-mantine-color-scheme="dark" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <Meta />
                <Links />
                <ColorSchemeScript forceColorScheme='dark' />
            </head>

            <body>
                <MantineProvider forceColorScheme='dark' theme={nanomolnTheme}>
                    <GlobalLoader />
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                    <Popups />
                    <Notifications position='top-center' zIndex={1000} />
                </MantineProvider>
            </body>
        </html>
    )
}
