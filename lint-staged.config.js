module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.{ts,tsx}?(x)': () => 'npm run check-types',
  '*.json': ['prettier --write']
}
