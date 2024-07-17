export
interface IErrorContent
{
    title: string
    content: string
    image?: string
    action?: TErrorAction
}

export
type TErrorAction = 'home' | 'reload' | 'none'
