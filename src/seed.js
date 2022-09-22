// based on: http://www.petecorey.com/blog/2020/01/01/random-seeds-lodash-and-es6-imports/
// you must import seed.js before any other modules in your files
import seedrandom from 'seedrandom'
import appconfig from '@/config'

if(appconfig.random_seed !== 0){ // if seed is 0, use true random number generator
    seedrandom(appconfig.random_seed, { global: true })
}