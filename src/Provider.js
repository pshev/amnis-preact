import {Component} from 'preact'

export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children[0]
  }
}
