import type { ReactNode } from 'react'

import { Breadcrumbs }   from '~/segments/behavior/Breadcrumbs'
import { AppHeaderView } from '~/shared/ui-kit/AppHeaderView'
import { LinkLogo }      from '~/shared/ui-kit/LinkLogo'

interface IAppHeaderProps
{
    actions?: ReactNode
}

export
function AppHeader
({ actions }: IAppHeaderProps )
{
    return (
        <AppHeaderView actions={actions}>
            <LinkLogo to="/" />
            <Breadcrumbs />
        </AppHeaderView>
    )
}
