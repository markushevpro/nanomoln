export
interface IErrorProps {
    error: string
}

export
function generateErrorProps
( text: string ): IErrorProps
{
    return { error: text }
}
