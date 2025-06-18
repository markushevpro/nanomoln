import { RemoveButton } from '@/segments/behavior/RemoveButton'

import type { ISelection } from '~/shared/lib/hooks/useSelection'

interface ISelectionActionsProps
{ selection: ISelection<string> }

export
function SelectionActions
({ selection }: ISelectionActionsProps )
{
    if ( !selection || selection.selected.length < 1 ) {
        return <></>
    }

    return (
        <>
            <RemoveButton files={selection.selected} onRemove={selection.reset} />
        </>
    )
}
