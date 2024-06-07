import { Anchor } from '@mantine/core'
import { Link }   from '@remix-run/react'

import { Logo } from '../Logo'

interface ILinkLogoProps
{
    to: string
}

export
function LinkLogo
({ to }: ILinkLogoProps )
{
    return (

        <Anchor
            c="primary.4"
            component={Link}
            h="30px"
            lh="30px"
            to={to}
        >
            <Logo />
        </Anchor>
    )
}
