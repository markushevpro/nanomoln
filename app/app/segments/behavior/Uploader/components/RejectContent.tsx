import type { ReactNode } from 'react'

import { Group, Text, rem }        from '@mantine/core'
import { IconQuestionMark, IconX } from '@tabler/icons-react'

interface IRejectContentProps
{
    unknown: boolean
}

export
function RejectContent
({ unknown }: IRejectContentProps ): ReactNode
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
                        : 'Unsupported file format'
                }

                {/*
                    mimes.length > 0 && (
                        <span style={{ fontSize: '0.5em' }}>
                            { `${mimes.map( mime => `"${mime}` ).join( ', ' )} is not allowed to upload`}
                        </span>
                    )
                */}
            </Text>
        </Group>
    )
}
