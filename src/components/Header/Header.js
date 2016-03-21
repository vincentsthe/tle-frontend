
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { appName } from '../../config';

import s from './Header.scss';
import { Input, Navbar } from 'react-bootstrap';
// import Navigation from '../Navigation';
import Location from '../../core/Location';
import Link from '../Link';

function Header({ userName }) {
  return (
    <Navbar className={s.root} staticTop>
      <Navbar.Header>
        <Navbar.Brand className={s.brand}>
          <Link to="/">
            {appName}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <form onSubmit={() => Location.push(`/user/${userName}`)}>
            <Input className={s.search} type="text" placeholder="Search" />
          </form>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  userName: PropTypes.string,
};

export default withStyles(Header, s);
