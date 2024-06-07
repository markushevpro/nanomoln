import type { ReactNode, PropsWithChildren } from 'react'

import { AppShell, Box, Group } from '@mantine/core'

import styles from './app-header.module.css'

interface IAppHeaderViewProps
    extends PropsWithChildren
{
    actions?: ReactNode
}
export
function AppHeaderView
({ children, actions }: IAppHeaderViewProps )
{
    return (
        <AppShell.Header className={styles.header}>
            <Box bg="primary.8">
                <Group h="60px" px="md">
                    { children }

                    <Group ml="auto">
                        { actions }
                    </Group>
                </Group>
            </Box>
        </AppShell.Header>
    )
}
