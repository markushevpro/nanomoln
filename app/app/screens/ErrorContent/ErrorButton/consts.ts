import type { TErrorAction } from '../lib/types'

export
const defaultButtonText = 'OK'

export
const errorButtons: Record<TErrorAction, string> = {
    home:   'Go home',
    reload: 'Reload',
    none:   ''
}
