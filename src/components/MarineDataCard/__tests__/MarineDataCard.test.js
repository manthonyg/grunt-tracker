import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';



it('MarineDataCard renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MarineDataCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
