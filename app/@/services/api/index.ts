import type { IDirInfo, IFileInfo } from '~/services/fs/types'

class ApiService
{
    async post
    <T>
    ( url: string, body: unknown ): Promise<T>
    {
        const resp = await fetch( url, {
            method: 'POST',
            body:   JSON.stringify( body )
        })

        return await resp.json()
    }

    async rename
    ( path: string, original: string, update: string ): Promise<void>
    {
        await this.post( '/api/folders/rename', {
            path,
            original,
            update
        })
    }

    async createFolder
    ( path: string, name: string ): Promise<void>
    {
        await this.post( '/api/folders/create', {
            path,
            name
        })
    }

    async getFolders
    ( path: string, top: string ): Promise<IDirInfo[]>
    {
        return await this.post( '/api/folders', {
            path,
            top
        })
    }

    async getFiles
    ( path: string ): Promise<IFileInfo[]>
    {
        return await this.post( '/api/folders/files', { path })
    }

    async moveFiles
    ( files: string[], target: string ): Promise<void>
    {
        await this.post( '/api/folders/move', {
            files,
            target
        })
    }

    async uploadFiles
    ( files: File[], target: string ): Promise<void>
    {
        const data = new FormData()

        files.forEach( file => {
            data.append( 'file', file )
        })

        await fetch( `/api/folders/upload?target=${encodeURIComponent( target )}`, {
            method: 'POST',
            body:   data
        })
    }

    async removeFiles
    ( list: string[]): Promise<void>
    {
        await this.post( '/api/folders/remove', { list })
    }
}

export
const apiService = new ApiService()
