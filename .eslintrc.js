module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Regras de qualidade de código
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    
    // Regras de estilo
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Regras de performance
    'no-var': 'error',
    'prefer-const': 'error',
    'no-loop-func': 'error',
    
    // Regras de segurança
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    
    // Regras de acessibilidade
    'jsx-a11y/alt-text': 'off', // Não aplicável para HTML puro
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  },
  globals: {
    // Variáveis globais do projeto
    'window': 'readonly',
    'document': 'readonly',
    'console': 'readonly',
    'process': 'readonly',
    
    // Bibliotecas externas
    'gsap': 'readonly',
    'ScrollTrigger': 'readonly',
    'Lenis': 'readonly',
    'THREE': 'readonly',
    'Swiper': 'readonly',
    'AOS': 'readonly',
    
    // Variáveis globais do projeto
    'CAJAIT_CONFIG': 'readonly',
    'CajaitApp': 'readonly'
  }
}; 