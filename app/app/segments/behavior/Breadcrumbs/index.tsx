import { Breadcrumbs as MBreadcrumbs, Anchor } from '@mantine/core'
import { Link }                                from '@remix-run/react'

import styles             from './Breadcrumbs.module.css'
import { useBreadcrumbs } from './hooks'

export
function Breadcrumbs
()
{
    const { visible, path, active } = useBreadcrumbs()

    return visible
        ? (
            <MBreadcrumbs classNames={styles}>
                {
                    path.map( b => (
                        <Anchor key={b.link} component={Link} to={b.link}>
                            {b.text}
                        </Anchor>
                    ))
                }

                <Anchor c="primary.0" underline='never'>
                    { active }
                </Anchor>
            </MBreadcrumbs>
        )
        : null
}
