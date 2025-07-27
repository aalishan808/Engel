const { execSync } = require('child_process')

try {
  console.log('Running postbuild...')
  execSync('npm run postbuild', { stdio: 'inherit' })
} catch (error) {
  console.error('Postbuild failed:', error)
  process.exit(1)
}