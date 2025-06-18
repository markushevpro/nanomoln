import { useMemo } from 'react'

import { detectAuth } from './helpers'

import { useConfig } from '~/services/config/useConfig'

interface IAuth
{
    auth: boolean | undefined
    token: string | null
}

export
function useAuth
(): IAuth
{
    const config = useConfig()

    const auth = useMemo(
        () => detectAuth( config ),
        [ config ]
    )

    const token = null

    return useMemo(
        () => ({
            token,
            auth
        }),
        [ token, auth ]
    )
}
