function arrToObject ( arr, valueTemplate )
{
    const res = {}

    arr.forEach( key => {
        res[key] = Array.isArray( valueTemplate ) ? [ ...valueTemplate ] : cloneDeep( valueTemplate )
    })

    return res
}

function cloneDeep ( original )
{
    const res = {}

    Object.keys( original ).forEach( key => {
        if ( Array.isArray( original[key] )) {
            res[key] = original[key].map( cloneDeep )
        } else if ( typeof original[key] === 'object' ) {
            res[key] = cloneDeep( original[key] )
        } else {
            res[key] = original[key]
        }
    })

    return res
}

module.exports = {
    arrToObject,
    cloneDeep
}