import lazy from './lazy.js'
export default (app) => {
  app.directive('lazy', lazy)
}
