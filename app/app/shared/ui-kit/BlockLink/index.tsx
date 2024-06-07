import type { RemixLinkProps } from '@remix-run/react/dist/components'

import { Anchor } from '@mantine/core'
import { Link }   from '@remix-run/react'
import cn         from 'classnames'

import styles from './block-link.module.css'

interface IBlockLinksProps
    extends RemixLinkProps
{
    classNames?: string
}

export
function BlockLink
({ to, children, className }: IBlockLinksProps )
{
    return (
        <Anchor
            c="primary.1"
            className={cn( styles.link, className )}
            component={Link}
            to={to}
        >
            <span>
                { children }
            </span>
        </Anchor>
    )
}
