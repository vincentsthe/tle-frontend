
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { appName } from '../../config';

import s from './Header.scss';
import { ButtonInput, Input, Navbar } from 'react-bootstrap';
// import Navigation from '../Navigation';
import Location from '../../core/Location';
import Link from '../Link';
import SubmissionTablePanel from '../SubmissionTablePanel';
import * as HeaderAction from '../../actions/headerAction';

function Header({ userName, submission, setSubmissionLimit, setSubmissionShown }) {
  const submissionLimits = [5, 10, 25, 50, 100];
  return (
    <div>
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
      <SubmissionTablePanel isShown={submission.isShown} limits={submissionLimits} activeLimit={submission.limit} setSubmissionLimit={setSubmissionLimit} setSubmissionShown={setSubmissionShown} />
    </div>
  );
}

function mapStateToProps(state) {
  const { submission } = state.header;
  return {
    submission: {
      isShown: submission.isShown,
      limit: submission.limit,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HeaderAction, dispatch);
}

Header.propTypes = {
  userName: PropTypes.string,
  submission: PropTypes.shape({
    isShown: PropTypes.bool,
    limit: PropTypes.int,
  }),
  setSubmissionLimit: PropTypes.func.isRequired,
  setSubmissionShown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Header, s));
