import type { IConfirmationPopupData }    from './data'
import type { IConfirmationPopupActions } from './store'

import { confirmationPopupInitial } from './data'
import { useConfirmationPopup }     from './store'

import { generateStore } from '~/shared/stores/generator'

const [ useConfirmationPopupData, useConfirmationPopupActions ] = generateStore<IConfirmationPopupData, IConfirmationPopupActions>( confirmationPopupInitial, useConfirmationPopup )

export
{
    useConfirmationPopupData,
    useConfirmationPopupActions
}
