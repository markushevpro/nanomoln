import config from '@markushevpro/eslint-config/remix.mjs'

export default
[
    ...config,
    {
        languageOptions: {
            parserOptions: {
                projectService:  true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    }
]
