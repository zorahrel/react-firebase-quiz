/**
 * Test for Dot component
 */

import Dot from './dot';

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<Dot />', () => {
  it('should be a pretty red dot', () => {
    const renderedComponent = shallow(<Dot className="dotty" color="red" />);
    expect(renderedComponent.find('div').hasClass('dotty--red')).equal(true);
  });
});
