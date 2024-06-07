import type { IConfirmationPopupData } from './data'
import type { ReactNode }              from 'react'

import { create } from 'zustand'

import { confirmationPopupInitial } from './data'

export
interface IConfirmationPopupActions
{
    show: ( title: string, text: ReactNode, buttons: ReactNode ) => void
    hide: () => void
}

export
type IConfirmationPopup = IConfirmationPopupData & IConfirmationPopupActions

export
const useConfirmationPopup = create<IConfirmationPopup>(
    ( set ) => ({
        ...confirmationPopupInitial,
        show: ( title: string, text: ReactNode, buttons: ReactNode ) => {
            set({
                visible: true,
                title,
                text,
                buttons
            })
        },
        hide: () => {
            set({
                visible: false,
                title:   '',
                text:    '',
                buttons: null
            })
        }
    })
)
