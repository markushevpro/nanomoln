import type { IFilesStoreData } from './data'
import type { IFileInfo }       from '~/services/fs/types'

import { create } from 'zustand'

import { filesStoreInitial } from './data'

export
interface IFilesStoreActions
{
    lock: ( list: string[]) => void
    temp: ( list: IFileInfo[]) => void
    force: ( value: Partial<IFilesStoreData> ) => void
    update: ( value: Partial<IFilesStoreData> ) => void
}

export
type IFilesStore = IFilesStoreData & IFilesStoreActions

export
const useFilesStore = create<IFilesStore>(
    ( set ) => ({
        ...filesStoreInitial,
        lock: ( locked: string[]) => {
            set({ locked })
        },
        temp: ( temporary: IFileInfo[]) => {
            set({ temporary })
        },
        force: ( value: Partial<IFilesStoreData> ) => {
            set({
                ...filesStoreInitial,
                ...value
            })
        },
        update: ( value: Partial<IFilesStoreData> ) => {
            set({
                ...value,
                temporary: []
            })
        }
    })
)
