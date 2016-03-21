import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './RadioButtons.scss';
import { ButtonGroup } from 'react-bootstrap';

function RadioButtons({ items, active, label, onChange, className }) {
  return (
    <ButtonGroup className={className}>
      <span className={s.label}>{label}</span>
      {items.map((item) =>
        <label key={item} className={cx('btn', 'btn-default', s.button, (active === item ? 'active' : undefined))}>
          <input type="radio" className={s.radio} checked={(active === item)} onChange={() => { onChange(item); }} /> {item}
        </label>
      )}
    </ButtonGroup>
  );
}

RadioButtons.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.int])).isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.int]),
  label: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default withStyles(RadioButtons, s);
