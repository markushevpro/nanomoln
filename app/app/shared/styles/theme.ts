import { Checkbox, createTheme } from '@mantine/core'

import checkboxStyles from './components/checkbox.module.css'

export
const nanomolnTheme = createTheme({
    primaryColor: 'primary',
    colors:       {
        primary: [
            '#C3D4DC',
            '#6e9eb3',
            '#6398af',
            '#52859a',
            '#45768a',
            '#33667a',
            '#1e3c48',
            '#18303a',
            '#12242B',
            '#0c181d',
            '#060c03'
        ],
        dark: [
            '#edf2f4',
            '#2b2b2b',
            '#272625',
            '#24211e',
            '#201c18',
            '#1c1918',
            '#17110d',
            '#120D09',
            '#080604',
            '#000000'
        ]
    },
    components: {
        Checkbox: Checkbox.extend({
            defaultProps: { classNames: checkboxStyles },
            vars:         () => ({ root: { '--checkbox-color': 'var(--mantine-color-primary-6)' } })
        })
    }
})
