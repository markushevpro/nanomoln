/* eslint-disable @typescript-eslint/no-explicit-any */

type TPartialRecord<T> = Partial<Record<keyof T, unknown>>

export
function applyValues
<T extends Record<string, any>>
( source: Partial<T>, target: T ): T
{
    const res: T = { ...target }

    ;( Object.keys( source ) as Array<keyof T> )
        .forEach(
            ( key: keyof T ) =>
            {
                res[ key ] = source[ key ] as T[keyof T]
            }
        )

    return res
}

export
function getKeys
<T extends TPartialRecord<T>>
( obj: T ): Array<keyof T>
{
    return Object.keys( obj ) as Array<keyof T>
}

export
function extract
<T extends TPartialRecord<T>>
( obj: T, keys: Array<keyof T> ): Partial<T>
{
    const res: Partial<T> = {}

    keys.forEach( key => {
        res[ key ] = obj[ key ]
    })

    return res
}

export
function extractMap
<T extends TPartialRecord<T>>
( keys: Array<keyof T> )
{
    return ( obj: T ) => extract( obj, keys )
}

export
function exclude
<T extends TPartialRecord<T>>
( obj: T, ex: Array<keyof T> ): Partial<T>
{
    const res: Partial<T> = {}
    const keys = getKeys( obj )

    keys.forEach( key => {
        if ( !ex.includes( key )) {
            res[ key ] = obj[ key ]
        }
    })

    return res
}

export
function excludeMap
<T extends TPartialRecord<T>>
( keys: Array<keyof T> )
{
    return ( obj: T ) => exclude( obj, keys )
}
