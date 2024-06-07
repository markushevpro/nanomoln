import { generateServerApi } from '../generator'

import { create } from './handlers/create'
import { files }  from './handlers/files'
import { get  }   from './handlers/get'
import { move }   from './handlers/move'
import { remove } from './handlers/remove'
import { rename } from './handlers/rename'
import { upload } from './handlers/upload'

export
const folderApi = generateServerApi(
    {
        create,
        move,
        files,
        upload,
        remove,
        rename
    },
    get
)
