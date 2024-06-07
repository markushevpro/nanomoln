import type { PropsWithChildren, ReactNode } from 'react'

import { AppShell } from '@mantine/core'

import { AppHeader } from '~/segments/appearance/AppHeader'

interface IPageLayoutProps
    extends PropsWithChildren
{
    headerActions?: ReactNode
}

export
function PageLayout
({ headerActions, children }: IPageLayoutProps )
{
    return (
        <AppShell>
            <AppHeader actions={headerActions} />

            <AppShell.Main>
                { children }
            </AppShell.Main>
        </AppShell>
    )
}
