
<p align="center" style="margin-top: 25px">
  <strong>Preact bindings for Amnis</strong>
</p>

## 🔧 Installation

Assuming you use [npm](https://www.npmjs.com/) as your package manager:
```text
npm install --save amnis-preact
```
If you want to experiment and play around with `amnis-preact` without a module bundler or you don't use one - that's OK. 
This package includes precompiled production and development UMD builds. 
You can just drop a UMD build as a `<script>` tag on a page. The UMD builds make `amnisPreact` available as a `window.amnisPreact`.
```html
<script type="application/javascript" src="https://unpkg.com/amnis-preact"></script>
```
You can see a basic example in [this jsFiddle](https://jsfiddle.net/petershev/4y24re0u/).

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

## 🙏 License
MIT