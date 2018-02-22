
<h4 align="center">
  <strong>Preact bindings for Amnis</strong>
</h4>

### Usage
The API has two parts: `Provider` to put [`amnis`](http://npm.im/amnis)' store on the context 
and `connect` higher-order component (HOC) to hook up your [`preact`](http://npm.im/amnis) components with data and actions.

##### Provider

Wrap your root component in a `Provider` to put amnis' `store` on the context. <br/>

```js
import Preact, {h} from 'preact'
import {createStore} from 'amnis'
import {Provider} from 'amnis-preact'
import {Root} from './root'
import {rootReducer} from './reducers'

const store = createStore(rootReducer)

Preact.render((
  <Provider store={store}>
    <Root />
  </Provider>
), document.getElementById('root'))
```

##### connect

`connect` is a simple HOC that is used to hook up your `preact` components with some data from amnis' store and automatically re-render them when that data changes. It is also used to provide event-handlers.
<br/>
It take only 2 functions:

```js
import {h} from 'preact'
import {connect} from 'amnis-preact'

const CounterApp = ({count, onPlus, onMinus}) =>
  <div>
    <h1>{count}</h1>
    <button onClick={onPlus}>+</button>
    <button onClick={onMinus}>-</button>
  </div>

const mapStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = dispatch => ({
  onPlus: () => dispatch({type: 'INCREMENT'}),
  onMinus: () => dispatch({type: 'DECREMENT'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(CounterApp)
```