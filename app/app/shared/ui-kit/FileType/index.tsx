import styles from './file-type.module.css'

interface IFileTypeProps
{
    path: string
}

export
function FileType
({ path }: IFileTypeProps )
{
    const ext = path.split( '.' ).pop()

    if ( !ext ) {
        return null
    }

    return (
        <span className={styles.container}>
            { ext }
        </span>
    )
}
