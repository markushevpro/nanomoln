import type { IErrorContent } from './types'

export
const errorContent: Record<number, IErrorContent> = {
    404: {
        title:   'Not found',
        content: 'Wrong URL',
        action:  'home'
    }
}

export
const unknownError: IErrorContent = {
    title:   'Unknown error',
    content: 'Something went wrong',
    action:  'home'
}
