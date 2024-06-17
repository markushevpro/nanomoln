import type { IErrorStoreData } from './data'

import { create } from 'zustand'

import { errorStoreInitial } from './data'

export
interface IErrorStoreActions
{
    set: ( code: number ) => void
    flush: () => void
}

export
type IErrorStore = IErrorStoreData & IErrorStoreActions

export
const useErrorStore = create<IErrorStore>(
    ( set ) => ({
        ...errorStoreInitial,
        set:   ( code: number ) => { set({ code }) },
        flush: () => { set({ code: undefined }) }
    })
)
