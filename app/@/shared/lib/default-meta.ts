import type {  MetaFunction } from '@remix-run/node'

export
function meta
(): ReturnType<MetaFunction>
{
    return [
        { title: 'nanomoln' },
        {
            name:    'description',
            content: 'Simple files manipulation'
        }
    ]
}
