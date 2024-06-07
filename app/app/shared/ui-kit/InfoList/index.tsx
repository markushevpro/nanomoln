import type { IInfoListItem } from './types'

import { Info } from '../Info'

import styles from './info-list.module.css'

const iconSize = 16

interface IInfoListProps
{
    items: IInfoListItem[]
}

export
function InfoList
({ items }: IInfoListProps )
{
    return (
        <ul className={styles.container}>
            {
                items.map( item => {
                    if ( !item ) {
                        return null
                    }

                    const Icon = item.icon

                    return (
                        <Info
                            key={item.key}
                            postfix={Icon && <Icon size={iconSize} />}
                            styles={styles}
                            text={item.content}
                        />
                    )
                })
            }
        </ul>
    )
}
