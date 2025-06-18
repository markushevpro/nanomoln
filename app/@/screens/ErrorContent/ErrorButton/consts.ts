import type { TErrorAction } from '@/screens/ErrorContent/lib/types'

export
const defaultButtonText = 'OK'

export
const errorButtons: Record<TErrorAction, string> = {
    home:   'Go home',
    reload: 'Reload',
    none:   ''
}
