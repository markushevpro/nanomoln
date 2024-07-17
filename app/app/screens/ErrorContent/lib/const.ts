import type { IErrorContent } from './types'

import { CONFIG_ERROR } from '~/services/error/consts'

export
const errorContent: Record<number, IErrorContent> = {
    404: {
        title:   'Not found',
        content: 'Wrong URL',
        action:  'home'
    }
}

errorContent[ CONFIG_ERROR ] = {
    title:   'Config error',
    content: 'Config is misconfigured. Please fix config.json and restart nanomoln',
    action:  'none'
}

export
const unknownError: IErrorContent = {
    title:   'Unknown error',
    content: 'Something went wrong',
    action:  'home'
}
