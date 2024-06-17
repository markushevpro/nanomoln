import type { IErrorStoreData }    from './data'
import type { IErrorStoreActions } from './store'

import { generateStore } from '~/shared/stores/generator'

import { errorStoreInitial } from './data'
import { useErrorStore }     from './store'

export type { IErrorStoreActions, IErrorStoreData }

const [ useErrorStoreData, useErrorStoreActions ] = generateStore<IErrorStoreData, IErrorStoreActions>( errorStoreInitial, useErrorStore )

export {
    useErrorStoreData,
    useErrorStoreActions
}
