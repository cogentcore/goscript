// runner.ts is the entry point of the generated test runners. Importing it
// first marks the program as a test binary before the tested packages are
// initialized, so that testing.Testing reports true during their
// initialization, as in Go.
import { markTestBinary } from './testing.js'

markTestBinary()

export { runTests } from './testing.js'
