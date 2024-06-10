import type { IDirInfo, IFSEditable, IFSInfo, IFileInfo, IPathInfo, ITopPathInfo } from '~/services/fs/types'
import type { IFilesStoreData }                                                    from '~/shared/stores/files'

import { apiService }      from '~/services/api'
import { fsClientService } from '~/services/fs/client.service'

export
function checkExist
( data: IPathInfo, name: string, onExist: ( name: string ) => void ): boolean
{
    const exist = !!data.folders.find( f => f.filename === name ) || !!data.files.find( f => f.filename === name )

    if ( exist ) {
        onExist( name )
    }

    return exist
}

export
async function getFiles
<T extends IPathInfo>
( key: string, data: T, topPath: string ): Promise<Partial<IFilesStoreData>>
{
    const folders = await apiService.getFolders( data.path, topPath )
    const files   = await apiService.getFiles( data.path )

    return {
        [ key ]: {
            ...data,
            folders,
            files
        }
    }
}

export
async function reloadData
( folder?: IPathInfo, top?: ITopPathInfo ): Promise<Partial<IFilesStoreData>>
{
    if ( folder ) {
        return await getFiles( 'folder', folder, top?.path ?? folder.path )
    }

    if ( top ) {
        return await getFiles( 'top', top, top.path )
    }

    return {}
}

export
function hasDraft
( target?: IPathInfo | ITopPathInfo ): boolean
{
    return !!target?.folders.find(( f: IDirInfo ) => !!f.draft )
}

export
function isDir
( item: IFileInfo | IDirInfo ): item is IDirInfo
{
    return !!( item as IDirInfo ).relative
}

export
function addFolder
<T extends IPathInfo>
( target: T, dir: IDirInfo ): T
{
    if ( !target ) {
        return target
    }

    return {
        ...target,
        folders: [
            ...target.folders,
            dir
        ]
    }
}

export
function applyDraft
<T extends IFSInfo & IFSEditable>
( list: T[], item: T ): T[]
{
    return list.map( f => {
        if ( f.path === item.path ) {
            return {
                ...f,
                draft: true
            }
        }

        return f
    })
}

function flushDraftList
<T extends IFSInfo & IFSEditable>
( list: T[]): T[]
{
    return list
        .filter( f => !f.draft || !!f.filename )
        .map( f => ({
            ...f,
            draft: false
        }))
}

export
function flushDraft
<T extends IPathInfo>
( target: T ): T
{
    return {
        ...target,
        folders: flushDraftList( target.folders ),
        files:   flushDraftList( target.files )
    }
}

export
function editItem
<T extends IPathInfo>
( item: IFileInfo | IDirInfo, target: T ): T
{
    if ( !target || !item ) {
        return target
    }

    if ( isDir( item )) {
        return {
            ...target,
            folders: applyDraft( target.folders, item )
        }
    } else {
        return {
            ...target,
            files: applyDraft( target.files, item )
        }
    }
}

export
function createFolderIn
( folder?: IPathInfo, top?: ITopPathInfo ): Partial<IFilesStoreData> | undefined
{
    const draft = fsClientService.dir.draft()

    if ( folder && !hasDraft( folder )) {
        return { folder: addFolder( folder, draft ) }
    }

    if ( top && !hasDraft( top )) {
        return { top: addFolder( top, draft ) }
    }
}

export
function editFolderIn
( item: IFileInfo | IDirInfo, folder?: IPathInfo, top?: ITopPathInfo ): Partial<IFilesStoreData> | undefined
{
    if ( folder ) {
        return { folder: editItem( item, flushDraft( folder )) }
    }

    if ( top ) {
        return { top: editItem( item, flushDraft( top )) }
    }
}
