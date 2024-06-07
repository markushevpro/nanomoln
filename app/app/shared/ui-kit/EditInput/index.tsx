import type { ChangeEvent, KeyboardEvent } from 'react'

import { TextInput }             from '@mantine/core'
import { useCallback, useState } from 'react'

interface IEditInputProps
{
    value?: string
    onSave: ( value: string ) => void
}

export
function EditInput
({ value, onSave }: IEditInputProps )
{
    const [ innerValue, $innerValue ] = useState<string>( value ?? '' )
    const [ loading, $loading ]       = useState<boolean>( false )

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        $innerValue( e.currentTarget.value )
    }

    const handleKeyPress = ( e: KeyboardEvent<HTMLInputElement> ) => {
        if ( e.key === 'Enter' ) {
            handleSave()
        }
    }

    const handleSave = useCallback(() => {
        $loading( true )
        onSave( innerValue )
    }, [ innerValue, onSave ])

    return (
        <TextInput
            autoFocus
            disabled={loading}
            value={innerValue}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
        />
    )
}
