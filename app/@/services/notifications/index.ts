import { notifications } from '@mantine/notifications'

import styles from './notifications.module.css'

const notificationLifetime = 3000

export
function showError
( title: string, message: string )
{
    notifications.show({
        withBorder: true,
        color:      'red',
        autoClose:  notificationLifetime,
        classNames: styles,
        title,
        message
    })
}
