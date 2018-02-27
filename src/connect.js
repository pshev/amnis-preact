import {h, Component} from 'preact'
import hoistStatics from 'hoist-non-react-statics'
import shallowEquals from 'shallow-equal/objects'
import {distinctUntilChanged, map} from 'stream-lite/es/operators'
import {subscribe} from 'stream-lite/es'

export const connect = (stateToProps, dispatchToProps) => WrappedComponent => {
  class Connected extends Component {
    constructor(props, context) {
      super(props)
      if (stateToProps) {
        if (context.store.state$.hasEmitted)
          this.state = stateToProps(context.store.state$.getValue())

        this.subscription = context.store.state$.pipe(
          distinctUntilChanged(),
          map(stateToProps),
          distinctUntilChanged(),
          subscribe(props => this.subscription ? this.setState(props) : this.state = props)
        )
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !(
        shallowEquals(this.props, nextProps) &&
        shallowEquals(this.state, nextState)
      )
    }

    componentWillUnmount() {
      this.subscription && this.subscription.unsubscribe()
    }

    render() {
      const {props, state, context} = this

      return h(WrappedComponent, Object.assign(
        {},
        props,
        state,
        (dispatchToProps ? dispatchToProps(context.store.dispatch) : {})
      ))
    }
  }

  return hoistStatics(Connected, WrappedComponent)
}
