import type { IFileInfo, IDirInfo, ITopPathInfo, IPathInfo } from '~/services/fs/types'
import type { IListItem }                                    from '~/shared/ui-kit/List/types'

import { IconFolderFilled, IconFolderUp } from '@tabler/icons-react'

import { DirActions }  from '~/segments/behavior/DirActions'
import { FileActions } from '~/segments/behavior/FileActions'
import { FileInfo }    from '~/segments/elements/FileInfo'
import { FolderInfo }  from '~/segments/elements/FolderInfo'

function formatFiles
( files?: IFileInfo[]): IListItem[]
{
    const res: IListItem[] = []

    if ( files ) {
        files.forEach( file => {
            res.push({
                key:     file.path,
                path:    file.path,
                text:    file.filename,
                draft:   file.draft,
                info:    <FileInfo data={file} />,
                actions: <FileActions file={file} />
            })
        })
    }

    return res
}

function formatFolders
( folders?: IDirInfo[], top?: ITopPathInfo, parent?: string ): IListItem[]
{
    const res: IListItem[] = []

    if ( folders && top ) {
        if ( parent ) {
            res.push({
                key:        parent,
                path:       parent,
                acceptDrop: true,
                draft:      false,
                text:       '..',
                icon:       <IconFolderUp />,
                link:       parent === top.path
                    ? `/view/${top.hash}`
                    : `/view/${top.hash}${parent.replace( /\\/g, '/' ).replace( top.path, '' )}`
            })
        }

        folders.forEach( folder => {
            res.push({
                key:        folder.path,
                path:       folder.path,
                acceptDrop: true,
                draft:      folder.draft,
                text:       folder.filename,
                link:       `/view/${top.hash}/${folder.relative}`,
                info:       <FolderInfo data={folder} />,
                icon:       <IconFolderFilled />,
                actions:    <DirActions dir={folder} />
            })
        })
    }

    return res
}

export
function joinList
( top?: ITopPathInfo, data?: IPathInfo ): IListItem[]
{
    const res: IListItem[] = []

    const folders = formatFolders( data?.folders, top, !( data as ITopPathInfo )?.hash ? ( data as IDirInfo )?.dir : undefined )
    const files   = formatFiles( data?.files )

    if ( folders.length > 0 ) {
        res.push( ...folders )
    }

    if ( files.length > 0 ) {
        res.push( ...files )
    }

    return res
}
