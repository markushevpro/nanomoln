import type { ReactNode } from 'react'

interface IInfoProps
{
    prefix?: ReactNode
    postfix?: ReactNode
    text?: ReactNode
    styles: Record<string, string>
}

export
function Info
({ prefix, postfix, text, styles }: IInfoProps )
{
    return (
        <li>
            { prefix && ( <span className={styles.prefix}>{ prefix }</span> )}
            <span className={styles.text}>{ text }</span>
            { postfix && ( <span className={styles.postfix}>{ postfix }</span> )}
        </li>
    )
}
