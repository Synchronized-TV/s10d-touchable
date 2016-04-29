import React from 'react';

import Touchable from '../src';

const Demo = () => {
  return (<div>
           <Touchable onTap={ () => alert('tap') }>Tap me</Touchable>
           <Touchable onDoubleTap={ () => alert('double tap') }>Double tap me</Touchable>
          </div>);
}

export default Demo;