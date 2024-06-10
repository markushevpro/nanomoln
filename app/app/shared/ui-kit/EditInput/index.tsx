import type { ChangeEvent, KeyboardEvent } from 'react'

import { TextInput }             from '@mantine/core'
import { useCallback, useState } from 'react'

interface IEditInputProps
{
    value?: string
    disabled?: boolean
    onSave: ( value: string ) => void
}

export
function EditInput
({ value, disabled, onSave }: IEditInputProps )
{
    const [ innerValue, $innerValue ] = useState<string>( value ?? '' )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        $innerValue( e.currentTarget.value )
    }

    const handleCancel = useCallback(
        () => {
            onSave( value ?? '' )
        },
        [ value, onSave ]
    )

    const handleSave = useCallback(
        () => {
            onSave( innerValue )
        },
        [ innerValue, onSave ]
    )

    const handleKeyPress = useCallback(
        ( e: KeyboardEvent<HTMLInputElement> ) =>
        {
            if ( e.key === 'Enter' ) {
                handleSave()
            }

            if ( e.key === 'Escape' ) {
                handleCancel()
            }
        },
        [ handleSave, handleCancel ]
    )

    return (
        <TextInput
            autoFocus
            disabled={disabled}
            value={innerValue}
            onBlur={handleCancel}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
        />
    )
}
