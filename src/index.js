import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Hammer from 'react-hammerjs';

const TOUCH_COMPATIBLE = (typeof window !=='undefined' && 'ontouchstart' in window)

export default class Touchable extends Component {
  static propTypes = {
    component: PropTypes.string,
    withHighlight: PropTypes.bool,
    highlightDelay: PropTypes.number,
    options: PropTypes.object,
    onTap: PropTypes.func,
    onDoubleTap: PropTypes.func,
    onPan: PropTypes.func,
    onSwipe: PropTypes.func,
    onPress: PropTypes.func,
    onPinch: PropTypes.func,
    onRotate: PropTypes.func,
    stopPropagation: PropTypes.bool,
    children: PropTypes.any
  };

  static defaultProps = {
    component: 'div',
    withHighlight: true,
    highlightDelay: 100,
    stopPropagation: true
  };

  constructor(props, ...args) {
    super(props, ...args);

    this.hasOnlyTap = props.onTap && !props.options
     && !props.onDoubleTap && !props.onPan && !props.onSwipe
     && !props.onPress && !props.onPinch && !props.onRotate;
  }

  componentDidMount() {
    this.el = findDOMNode(this);

    if (!this.hasOnlyTap) {
      this.el.addEventListener('touchstart', this.handleTouchStart);
      this.el.addEventListener('touchcancel', this.handleTouchEnd);
      this.el.addEventListener('touchend', this.handleTouchEnd);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);

    if (this.el && !this.hasOnlyTap) {
      this.el.removeEventListener('touchstart', this.handleTouchStart);
      this.el.removeEventListener('touchend', this.handleTouchEnd);
      this.el.removeEventListener('touchcancel', this.handleTouchEnd);
    }
  }

  handleSyntheticTouchStart = (e) => {
    this.touchPos = { x: e.touches && e.touches[0].clientX, y: e.touches && e.touches[0].clientY };
    this.handleTouchStart(e);
    this.moved = false;
  }

  handleSyntheticTouchEnd = (e) => {
    this.handleTouchEnd(e);

    if (!this.moved) {
      if (this.props.onTap) {
        this.props.onTap(e);
      }
    }

    this.moved = false;
  }

  handleSyntheticTouchCancel = () => {
    clearTimeout(this.timeout);
    this.removeHighlight();
    this.moved = false;
  }

  handleSyntheticTouchMove = (e) => {
    const touchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    if (Math.abs(touchPos.x - this.touchPos.x) > 10 || Math.abs(touchPos.y - this.touchPos.y) > 10) {
      clearTimeout(this.timeout);
      this.removeHighlight();
      this.moved = true;
    }
  }

  handleTouchStart = (e) => {
    clearTimeout(this.timeout);

    if (this.props.withHighlight) {
      this.timeout = setTimeout(this.addHighlight, this.props.highlightDelay);
    }

    if (this.props.stopPropagation) {
      e.stopPropagation();
    }
  }

  handleTouchEnd = (e) => {
    if (this.props.withHighlight) {
      this.timeout = setTimeout(this.removeHighlight, this.props.highlightDelay + 50);
    }

    if (!this.moved && this.props.stopPropagation) {
      e.stopPropagation();
    }
  }

  handlePan = (e) => {
    if (this.props.withHighlight) {
      this.el.classList.remove('touched');
    }

    if (this.props.onPan) {
      this.props.onPan(e);
    }
  }

  addHighlight = () => {
    if (!this.moved && this.el) {
      this.el.classList.add('touched');
    }
  }

  removeHighlight = () => {
    if (this.el) {
      this.el.classList.remove('touched');
    }
  }

  render() {
    // use hammerJS for gestures
    if (!this.hasOnlyTap) {
      const props = {
        component: this.props.component,
        options: {
          recognizers: {
            tap: {
              time: 10000000,
              threshold: 100
            }
          }
        }
      };

      Object.keys(this.props).forEach(function(i) {
        if (i !== 'onPan') {
          // ensure we copy the source options if any because Hammer mutates the object
          var value = (i === 'options') ? JSON.parse(JSON.stringify(this.props[i])) : this.props[i];
          props[i] = value;
        }
      }, this);

      props.onPan = this.handlePan;

      return (
        <Hammer { ...this.props } {...props}><div>{ this.props.children }</div></Hammer>
      );
    }
    // use native touchstart/touchend
    else {
      let handlers = {};
      if (TOUCH_COMPATIBLE) {
        handlers = {
          onTouchStart  : this.handleSyntheticTouchStart,
          onTouchMove   : this.handleSyntheticTouchMove,
          onTouchEnd    : this.handleSyntheticTouchEnd,
          onTouchCancel : this.handleSyntheticTouchCancel
        };
      } else {
        handlers = {
          onClick: this.handleSyntheticTouchEnd
        }
      }
      return (
        <this.props.component { ...this.props } { ...handlers }>
          { this.props.children }
        </this.props.component>
      );
    }
  }
}
