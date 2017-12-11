const dependable = require('dependable')
const path = require('path')

const container = dependable.container()
const simpleDependencies = [
  ['_', 'lodash'],
  []
]
simpleDependencies.forEach((dependecie) => {
  container.register(dependecie[0], () => {
    return require(dependecie[1])
  })
})
container.load(path.join(__dirname, '/controllers'))
container.load(path.join(__dirname, '/helpers'))
container.register('container', () => {
  return container
})
module.exports = container
