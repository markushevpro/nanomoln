import { Group, Text, rem }        from '@mantine/core'
import { IconQuestionMark, IconX } from '@tabler/icons-react'

import type { ReactNode } from 'react'

interface IRejectContentProps
{
    unknown: boolean
    mimes: string[]
}

export
function RejectContent
({ unknown, mimes }: IRejectContentProps ): ReactNode
{
    return (
        <Group
            gap="xl"
            justify="center"
            mih={220}
            style={{ pointerEvents: 'none' }}
        >
            {
                unknown
                    ? (
                        <IconQuestionMark
                            stroke={1.5}
                            style={{
                                width:  rem( 52 ),
                                height: rem( 52 ),
                                color:  'var(--mantine-color-red-6)'
                            }}
                        />
                    )
                    : (
                        <IconX
                            stroke={1.5}
                            style={{
                                width:  rem( 52 ),
                                height: rem( 52 ),
                                color:  'var(--mantine-color-red-6)'
                            }}
                        />
                    )
            }

            <Text inline size="xl">
                {
                    unknown
                        ? 'Warning: Unknown file format'
                        : 'Not allowed file format'
                }

                {
                    mimes.length > 0 && (
                        <span
                            style={{
                                marginTop: '1em',
                                fontSize:  '0.5em',
                                display:   'block'
                            }}
                        >
                            { `Files with types ${mimes.map( mime => `"${mime}"` ).join( ', ' )} are not allowed to upload`}
                        </span>
                    )
                }
            </Text>
        </Group>
    )
}
