import type { IFilesStoreData }    from './data'
import type { IFilesStoreActions } from './store'

import { generateStore } from '~/shared/stores/generator'

import { filesStoreInitial } from './data'
import { useFilesStore }     from './store'

export type { IFilesStoreActions, IFilesStoreData }

const [ useFilesStoreData, useFilesStoreActions ] = generateStore<IFilesStoreData, IFilesStoreActions>( filesStoreInitial, useFilesStore )

export {
    useFilesStoreData,
    useFilesStoreActions
}
