module.exports = {
  extends: [
    'stylelint-config-standard-scss'
  ],
  rules: {
    // Regras de SCSS
    'scss/at-import-partial-extension': 'always',
    'scss/at-import-partial-extension-blacklist': ['.scss'],
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/selector-no-redundant-nesting-selector': true,
    
    // Regras de CSS
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    
    // Regras de propriedades
    'property-case': 'lower',
    'property-no-vendor-prefix': true,
    'property-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-attachment',
      'background-position',
      'background-size',
      'color',
      'font',
      'font-family',
      'font-size',
      'font-style',
      'font-variant',
      'font-weight',
      'font-stretch',
      'font-size-adjust',
      'line-height',
      'text-align',
      'text-align-last',
      'text-decoration',
      'text-emphasis',
      'text-emphasis-color',
      'text-emphasis-style',
      'text-emphasis-position',
      'text-indent',
      'text-justify',
      'text-outline',
      'text-transform',
      'text-wrap',
      'text-overflow',
      'text-shadow',
      'vertical-align',
      'white-space',
      'word-spacing',
      'word-wrap',
      'word-break',
      'tab-size',
      'hyphens',
      'pointer-events',
      'cursor',
      'visibility',
      'zoom',
      'filter',
      'transform',
      'transform-origin',
      'transition',
      'transition-delay',
      'transition-timing-function',
      'transition-duration',
      'transition-property',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-play-state',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'content',
      'quotes',
      'counter-reset',
      'counter-increment',
      'resize',
      'user-select',
      'nav-index',
      'nav-up',
      'nav-right',
      'nav-down',
      'nav-left',
      'clip',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip-path',
      'fill',
      'stroke'
    ],
    
    // Regras de seletores
    'selector-class-pattern': '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
    'selector-id-pattern': '^[a-z]([a-z0-9-]+)?$',
    'selector-max-compound-selectors': 4,
    'selector-max-specificity': '0,4,0',
    'selector-no-qualifying-type': true,
    'selector-no-vendor-prefix': true,
    
    // Regras de valores
    'value-no-vendor-prefix': true,
    'value-list-comma-space-after': 'always',
    'value-list-comma-space-before': 'never',
    
    // Regras de unidades
    'unit-case': 'lower',
    'unit-no-unknown': true,
    
    // Regras de comentários
    'comment-empty-line-before': 'always',
    'comment-whitespace-inside': 'always',
    
    // Regras de espaçamento
    'declaration-block-semicolon-space-after': 'always',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    
    // Regras de blocos
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-after': 'always-single-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',
    
    // Regras de media queries
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    
    // Regras de at-rules
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always',
    'at-rule-no-vendor-prefix': true,
    'at-rule-semicolon-newline-after': 'always',
    
    // Regras de listas
    'list-style-image': 'never',
    'list-style-type': 'never',
    
    // Regras de números
    'number-leading-zero': 'always',
    'number-max-precision': 4,
    'number-no-trailing-zeros': true,
    
    // Regras de strings
    'string-quotes': 'single',
    
    // Regras de time
    'time-min-milliseconds': 100,
    
    // Regras de URLs
    'function-url-no-scheme-relative': true,
    'function-url-quotes': 'always',
    'function-url-scheme-whitelist': ['data', 'http', 'https'],
    
    // Regras de funções
    'function-calc-no-unspaced-operator': true,
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-whitelist': null,
    'function-url-no-scheme-relative': true,
    
    // Regras de keyframes
    'keyframes-name-pattern': '^[a-z]([a-z0-9-]+)?$',
    
    // Regras de length
    'length-zero-no-unit': true,
    
    // Regras de max-line-length
    'max-line-length': 120,
    
    // Regras de max-nesting-depth
    'max-nesting-depth': 4,
    
    // Regras de no-duplicate-selectors
    'no-duplicate-selectors': true,
    
    // Regras de no-empty-source
    'no-empty-source': true,
    
    // Regras de no-extra-semicolons
    'no-extra-semicolons': true,
    
    // Regras de no-invalid-double-slash-comments
    'no-invalid-double-slash-comments': true,
    
    // Regras de no-missing-end-of-source-newline
    'no-missing-end-of-source-newline': true,
    
    // Regras de no-unknown-animations
    'no-unknown-animations': true
  }
}; 