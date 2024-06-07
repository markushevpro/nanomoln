import type { ReactNode } from 'react'

import { rem }        from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'

export
function AcceptContent
(): ReactNode
{
    return (
        <IconUpload
            stroke={1.5}
            style={{
                width:  rem( 52 ),
                height: rem( 52 ),
                color:  'var(--mantine-color-blue-6)'
            }}
        />
    )
}
