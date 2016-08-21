/* eslint-disable no-restricted-syntax */

const JSDOC_3_TAGS = [
  'abstract', 'access', 'alias', 'augments', 'author', 'borrows', 'callback',
  'class', 'classdesc', 'constant', 'constructs', 'copyright', 'default',
  'deprecated', 'description', 'enum', 'event', 'example', 'exports', 'external',
  'file', 'fires', 'function', 'global', 'ignore', 'implements', 'inheritdoc',
  'inner', 'instance', 'interface', 'kind', 'lends', 'license', 'listens',
  'member', 'memberof', 'mixes', 'mixin', 'module', 'name', 'namespace',
  'override', 'param', 'private', 'property', 'protected', 'public', 'readonly',
  'requires', 'returns', 'see', 'since', 'static', 'summary', 'this', 'throws',
  'todo', 'tutorial', 'type', 'typedef', 'variation', 'version'
];

const ALL_JSDOC_TAGS_COMMENT = '/** \n * @' + JSDOC_3_TAGS.join('\n * @') + '\n */';

export default {
    invalid: [
        {
            code: `
                /**
                 * @Param
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc tag name "Param".'
                }
            ]
        },
        {
            code: `
                /**
                 * @foo
                 */
                function quux () {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc tag name "foo".'
                }
            ]
        },
        {
            code: `
                /**
                 * @arg foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".'
                }
            ]
        },
        {
            code: `
                /**
                 * @param foo
                 */
                function quux (foo) {

                }
            `,
            errors: [
                {
                    message: 'Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".'
                }
            ],
            settings: {
                jsdoc: {
                    tagNamePreference: {
                        param: 'arg'
                    }
                }
            }
        }
    ],
    valid: [
        {
            code: `
                /**
                 * @param foo
                 */
                function quux (foo) {

                }
            `
        },
        {
            code: `
                /**
                 * @arg foo
                 */
                function quux (foo) {

                }
            `,
            settings: {
                jsdoc: {
                    tagNamePreference: {
                        param: 'arg'
                    }
                }
            }
        },
        {
            code: ALL_JSDOC_TAGS_COMMENT + '\n' + 'function quux (foo) {}',
        }
    ]
};
