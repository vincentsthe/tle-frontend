import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SubmissionTablePanel from '../../components/SubmissionTablePanel';
import * as LiveSubmissionAction from '../../actions/liveSubmissionAction';

function LiveSubmission({ className, submission, getSubmissions, setSubmissionLimit, setSubmissionShown }) {
  const submissionLimits = [5, 10, 25, 50, 100];
  return (
    <SubmissionTablePanel className={className} title="Live Submissions" visibilityToggle userId={undefined} limits={submissionLimits} submission={submission} getSubmissions={getSubmissions} setSubmissionLimit={setSubmissionLimit} setSubmissionShown={setSubmissionShown} />
  );
}

function mapStateToProps(state) {
  const { submission } = state.liveSubmission;
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LiveSubmissionAction, dispatch);
}

LiveSubmission.propTypes = {
  className: PropTypes.string,
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
    isPolling: PropTypes.bool,
    isPending: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    error: PropTypes.any,
  }),
  getSubmissions: PropTypes.func.isRequired,
  setSubmissionLimit: PropTypes.func.isRequired,
  setSubmissionShown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveSubmission);
