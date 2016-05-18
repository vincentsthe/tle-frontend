import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './User.scss';

import SubmissionTablePanel from '../../components/SubmissionTablePanel';
import * as SubmissionAction from '../../actions/userSubmissionAction';

import ProblemRecommendationTablePanel from '../../components/ProblemRecommendationTablePanel';
import * as ProblemRecommendationAction from '../../actions/problemRecommendationAction';

function User({
  submission, getSubmissions, setSubmissionLimit,
  recommendation, getRecommendations, setRecommendationLimit,
  userData }) {

  const { id, name, acceptedSubmission, totalSubmission, acceptedProblem } = userData;
  const userName = userData.username;
  const submissionLimits = [5, 10, 25, 50, 100];
  const recommendationLimits = [25, 50, 100];

  return (typeof name !== 'undefined') ? (
    <div className={s.root}>
      <div className={s.container}>
        <h2><span className={s.title}>{name}</span> ({userName})</h2>
        <div className={s.quickStats}>
          <div className={s.stat}>Accepted Submissions: {acceptedSubmission}</div>
          <div className={s.stat}>Total Submissions: {totalSubmission}</div>
          <div className={s.stat}>Accepted Problems: {acceptedProblem}</div>
        </div>
        <div className={s.submissionTable}>
          <SubmissionTablePanel
            title="Last Submissions"
            isPolling={false}
            submission={submission}
            limits={submissionLimits}
            getSubmissions={getSubmissions}
            setSubmissionLimit={setSubmissionLimit}
            setSubmissionShown={null}
            userId={id}
          />
        </div>
        <div className={s.problemRecommendationTable}>
          <ProblemRecommendationTablePanel
            title="Next Problems to Solve"
            recommendation={recommendation}
            limits={recommendationLimits}
            getRecommendations={getRecommendations}
            setRecommendationLimit={setRecommendationLimit}
            userId={id}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={s.root}>
      <div className={s.container}>
        <h2><span className={s.title}>User name not found.</span></h2>
        <div className={s.quickStats}>Please recheck the user name you enter.</div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { submission } = state.userSubmission;
  const { recommendation } = state.problemRecommendation;
  return {
    submission: {
      data: submission.data,
      limit: submission.limit,
      isPolling: submission.isPolling,
      isShown: submission.isShown,
      isPending: submission.isPending,
      isFulfilled: submission.isFulfilled,
      error: submission.error,
    },
    recommendation: {
      data: recommendation.data,
      limit: recommendation.limit,
      isPending: recommendation.isPending,
      isFulfilled: recommendation.isFulfilled,
      error: recommendation.error,
    }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...SubmissionAction, ...ProblemRecommendationAction}, dispatch);
}

User.propTypes = {
  submission: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      problemSlug: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string,
      verdictName: PropTypes.string,
      score: PropTypes.int,
      submitTime: PropTypes.int,
    })).isRequired,
    limit: PropTypes.int,
    isShown: PropTypes.bool,
    isPending: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    error: PropTypes.any,
  }),
  recommendation: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      slug: PropTypes.string,
      acceptedUser: PropTypes.int,
      acceptedSubmission: PropTypes.int,
      totalSubmission: PropTypes.int,
      url: PropTypes.string,
    })).isRequired,
    limit: PropTypes.int,
    isPending: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    error: PropTypes.any,
  }),
  userData: PropTypes.shape({
    id: PropTypes.int,
    username: PropTypes.string,
    name: PropTypes.string,
    acceptedSubmission: PropTypes.int,
    totalSubmission: PropTypes.int,
    acceptedProblem: PropTypes.int,
  }),
  getSubmissions: PropTypes.func.isRequired,
  setSubmissionLimit: PropTypes.func.isRequired,
  getRecommendations: PropTypes.func.isRequired,
  setRecommendationLimit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(User, s));
