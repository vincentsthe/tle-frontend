import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SubmissionTablePanel from '../../components/SubmissionTablePanel';
import * as LiveSubmissionAction from '../../actions/liveSubmissionAction';

function LiveSubmission({ submission, setSubmissionLimit, setSubmissionShown }) {
  const submissionLimits = [5, 10, 25, 50, 100];
  return (
    <SubmissionTablePanel isShown={submission.isShown} limits={submissionLimits} activeLimit={submission.limit} setSubmissionLimit={setSubmissionLimit} setSubmissionShown={setSubmissionShown} />
  );
}

function mapStateToProps(state) {
  const { submission } = state.liveSubmission;
  return {
    submission: {
      isShown: submission.isShown,
      limit: submission.limit,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LiveSubmissionAction, dispatch);
}

LiveSubmission.propTypes = {
  submission: PropTypes.shape({
    isShown: PropTypes.bool,
    limit: PropTypes.int,
  }),
  setSubmissionLimit: PropTypes.func.isRequired,
  setSubmissionShown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveSubmission);
