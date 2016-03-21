import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

function Home() {
  return (
    <div className={s.root}>
    </div>
  );
}

export default withStyles(Home, s);
