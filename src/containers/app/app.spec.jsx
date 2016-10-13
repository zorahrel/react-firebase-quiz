import React from 'react';
import { expect } from 'chai';

import App from './app.jsx';

describe('App', () => {
  it('should be rendered', () => {
    expect(App).to.exist;
  });
});
