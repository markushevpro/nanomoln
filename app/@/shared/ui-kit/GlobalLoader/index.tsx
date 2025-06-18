import { useNavigation }       from '@remix-run/react'
import { useEffect, useState } from 'react'
import LoadingBar              from 'react-top-loading-bar'

import { useLoadState } from './hooks/useLoadState'

export
function GlobalLoader
()
{
    const navigation              = useNavigation()
    const [ progress, $progress ] = useState( 0 )
    const loadState               = useLoadState( true )

    useEffect(() => {
        switch ( navigation.state ) {
            case 'submitting':
                $progress( Math.max( progress, 25 ))
                return

            case 'loading':
                loadState.lock()
                $progress( Math.max( progress, 75 ))
                return

            case 'idle':
            default:
                loadState.unlock()
                $progress(( old: number ) => old === 0 ? 0 : 100 )
        }
    }, [ navigation.state, progress, loadState ])

    return (
        <LoadingBar
            color={ progress <= 50 ? 'var(--color-red)' : 'var(--color-green)'}
            progress={progress}
            onLoaderFinished={() => { $progress( 0 ) }}
        />
    )
}
