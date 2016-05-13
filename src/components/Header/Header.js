import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { appName } from '../../config';

import s from './Header.scss';
import { Input, Navbar } from 'react-bootstrap';
// import Navigation from '../Navigation';
import Location from '../../core/Location';
import Link from '../Link';
import * as HeaderActions from '../../actions/headerAction';

class Header extends Component {
  constructor() {
    super();
    this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
  }

  handleUserNameSubmit(event) {
    const { userName } = this.props;

    event.preventDefault();

    if (userName !== '') {
      Location.push(`/user/${userName}`);
    } else {
      Location.push('/');
    }
  }

  render() {
    const { userName, setUserName } = this.props;
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
            <form className={s.searchForm} onSubmit={this.handleUserNameSubmit}>
              <Input className={s.search} onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="Search user..." />
              <span className={s.searchIcon}><i className="fa fa-search"></i></span>
            </form>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const header = state.header;
  return {
    userName: header.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HeaderActions, dispatch);
}

Header.propTypes = {
  userName: PropTypes.string,
  setUserName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Header, s));
