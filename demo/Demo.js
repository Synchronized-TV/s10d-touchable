import React from 'react';

import Touchable from '../src';

class Counter extends React.Component {
  state = {
    count: 0
  }
  static propTypes = {
    callback: React.PropTypes.string.isRequired,
    label: React.PropTypes.string
  }
  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    let cb = this.props.callback;
    return <Touchable { ...{ [cb]: this.increment } } className='button'>{this.props.label} ({this.state.count})</Touchable>
  }
}


class Demo extends React.Component {
  render() {
      return (<div>
               <Counter label='TAP' callback='onTap'/>
               <Counter label='DBLTAP' callback='onDoubleTap'/>
              </div>);
  }
}

export default Demo;