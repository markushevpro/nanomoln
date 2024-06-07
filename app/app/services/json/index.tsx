import { fsService } from '~/services/fs/service'

class JSONService {
    read ( path: string ) {
        try {
            return JSON.parse( fsService.file.read( path ))
        } catch ( e: unknown ) {
            throw new Error( e as string )
        }
    }
}

export
const jsonService = new JSONService()
