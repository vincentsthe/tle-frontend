import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Tabs, Tab } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './User.scss';

import SubmissionTablePanel from '../../components/SubmissionTablePanel';
import * as SubmissionAction from '../../actions/userSubmissionAction';

import ProblemRecommendationTablePanel from '../../components/ProblemRecommendationTablePanel';
import * as ProblemRecommendationAction from '../../actions/problemRecommendationAction';

import RankTablePanel from '../../components/RankTablePanel';
import * as UserRankAction from '../../actions/userRankAction';

function User({
  submission, getSubmissions, setSubmissionLimit,
  recommendation, getRecommendations, setRecommendationLimit,
  rank, getRanks, setRankAbove, setRankBelow,
  userData }) {

  const { name, acceptedSubmission, totalSubmission, acceptedProblem } = userData;
  const userId = userData.id;
  const userName = userData.username;
  const submissionLimits = [5, 10, 25, 50, 100];
  const recommendationLimits = [5, 10, 25, 50, 100];
  const rankLimits = [5, 10, 25, 50, 100];

  return (typeof name !== 'undefined') ? (
    <div className={s.root}>
      <div className={s.container}>
        <h2><span className={s.title}>{name}</span> ({userName})</h2>
        <div className={s.quickStats}>
          <div className={s.stat}>Accepted Submissions: {acceptedSubmission}</div>
          <div className={s.stat}>Total Submissions: {totalSubmission}</div>
          <div className={s.stat}>Accepted Problems: {acceptedProblem}</div>
        </div>
        <Tabs className={s.tabs} defaultActiveKey={1}>
          <Tab eventKey={1} title="Last Submissions">
            <div className={s.submissionTable}>
              <SubmissionTablePanel
                title="Last Submissions"
                isPolling={false}
                submission={submission}
                limits={submissionLimits}
                getSubmissions={getSubmissions}
                setSubmissionLimit={setSubmissionLimit}
                setSubmissionShown={null}
                userId={userId}
              />
            </div>
          </Tab>
          <Tab eventKey={2} title="Next Problems to Solve">
            <div className={s.problemRecommendationTable}>
              <ProblemRecommendationTablePanel
                title="Next Problems to Solve"
                recommendation={recommendation}
                limits={recommendationLimits}
                getRecommendations={getRecommendations}
                setRecommendationLimit={setRecommendationLimit}
                userId={userId}
              />
            </div>
          </Tab>
          <Tab eventKey={3} title="User Rank">
            <div className={s.rankTable}>
              <RankTablePanel
                title="User Rank"
                rank={rank}
                limits={rankLimits}
                getRanks={getRanks}
                setRankAbove={setRankAbove}
                setRankBelow={setRankBelow}
                userId={userId}
                userRank={userData.rank}
              />
            </div>
          </Tab>
          <Tab eventKey={4} title="Show All Info">
            <div className={s.submissionTable}>
              <SubmissionTablePanel
                title="Last Submissions"
                isPolling={false}
                submission={submission}
                limits={submissionLimits}
                getSubmissions={getSubmissions}
                setSubmissionLimit={setSubmissionLimit}
                setSubmissionShown={null}
                userId={userId}
              />
            </div>
            <div className={s.problemRecommendationTable}>
              <ProblemRecommendationTablePanel
                title="Next Problems to Solve"
                recommendation={recommendation}
                limits={recommendationLimits}
                getRecommendations={getRecommendations}
                setRecommendationLimit={setRecommendationLimit}
                userId={userId}
              />
            </div>
            <div className={s.rankTable}>
              <RankTablePanel
                title="User Rank"
                rank={rank}
                limits={rankLimits}
                getRanks={getRanks}
                setRankAbove={setRankAbove}
                setRankBelow={setRankBelow}
                userId={userId}
                userRank={userData.rank}
              />
            </div>
          </Tab>
        </Tabs>
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
  const { rank } = state.userRank;
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
    },
    rank: {
      data: rank.data,
      above: rank.above,
      below: rank.below,
      isPending: rank.isPending,
      isFulfilled: rank.isFulfilled,
      error: rank.error,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...SubmissionAction, ...ProblemRecommendationAction, ...UserRankAction}, dispatch);
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
  rank: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.int,
      name: PropTypes.string,
      username: PropTypes.string,
      acceptedProblem: PropTypes.int,
      acceptedSubmission: PropTypes.int,
      totalSubmission: PropTypes.int,
    })).isRequired,
    above: PropTypes.int,
    below: PropTypes.int,
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
    rank: PropTypes.int,
  }),
  getSubmissions: PropTypes.func.isRequired,
  setSubmissionLimit: PropTypes.func.isRequired,
  getRecommendations: PropTypes.func.isRequired,
  setRecommendationLimit: PropTypes.func.isRequired,
  getRanks: PropTypes.func.isRequired,
  setRankAbove: PropTypes.func.isRequired,
  setRankBelow: PropTypes.func.isRequired,
};

export default withStyles(connect(mapStateToProps, mapDispatchToProps)(User), s);
