import type { ReactNode } from 'react'

export
interface IConfirmationPopupData
{
    visible: boolean
    title: string
    text: ReactNode
    buttons: ReactNode
}

export
const confirmationPopupInitial: IConfirmationPopupData = {
    visible: false,
    title:   '',
    text:    null,
    buttons: null
}
