#!../node_modules/.bin/babel-node

import {Bechamel} from './src/bechamel.js'

const path = process.cwd()
const application = new Bechamel(path)

application.run()