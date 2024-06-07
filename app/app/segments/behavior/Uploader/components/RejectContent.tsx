import type { ReactNode } from 'react'

import { Group, Text, rem } from '@mantine/core'
import { IconX }            from '@tabler/icons-react'

export
function RejectContent
(): ReactNode
{
    return (

        <Group
            gap="xl"
            justify="center"
            mih={220}
            style={{ pointerEvents: 'none' }}
        >
            <IconX
                stroke={1.5}
                style={{
                    width:  rem( 52 ),
                    height: rem( 52 ),
                    color:  'var(--mantine-color-red-6)'
                }}
            />

            <Text inline size="xl">
                {'Unsupported file format'}
            </Text>
        </Group>
    )
}
