export
function filterUnique
<T>
( item: T, index: number, array: T[]): boolean
{
    return array.indexOf( item ) === index
}
