import { useCallback, useMemo } from 'react'

interface IUseLoadStateResult
{
    lock: () => void
    unlock: () => void
}

export
function useLoadState
( lockActions?: boolean ): IUseLoadStateResult
{
    const lock = useCallback(() => {
        document.documentElement.style.cursor = 'wait'

        if ( lockActions ) {
            document.body.style.pointerEvents = 'none'
        }
    }, [ lockActions ])

    const unlock = useCallback(() => {
        document.documentElement.style.cursor = 'default'
        document.body.style.pointerEvents     = 'all'
    }, [])

    return useMemo(() => ({
        lock,
        unlock
    }), [ lock, unlock ])
}
