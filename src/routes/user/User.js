import React, { PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './User.scss';

function User({ userData }) {
  const { name, acceptedSubmission, totalSubmission, acceptedProblem } = userData;
  const userName = userData.username;

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2><span className={s.title}>{name}</span> ({userName})</h2>
        <div className="submissionTable" />
        <div className={s.quickStats}>
          <div className={s.stat}>Accepted Submissions: {acceptedSubmission}</div>
          <div className={s.stat}>Total Submissions: {totalSubmission}</div>
          <div className={s.stat}>Accepted Problems: {acceptedProblem}</div>
        </div>
      </div>
    </div>
  );
}

User.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.int,
    username: PropTypes.string,
    name: PropTypes.string,
    acceptedSubmission: PropTypes.int,
    totalSubmission: PropTypes.int,
    acceptedProblem: PropTypes.int,
  }),
};

export default withStyles(User, s);
