import React, { PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SubmissionTablePanel.scss';
import cx from 'classnames';

import { Row, Col, Panel, Button } from 'react-bootstrap';
import SubmissionTable from '../../components/SubmissionTable';
import RadioButtons from '../../components/RadioButtons';

function SubmissionTablePanel({ className, userId, title, visibilityToggle, limits, submission, getSubmissions, setSubmissionLimit, setSubmissionShown }) {
  const visibilityToggleButton = (visibilityToggle) ? (
    <Button bsSize="large" bsStyle={(submission.isShown ? 'default' : 'primary')} onClick={() => setSubmissionShown(!submission.isShown)} block>
      {(submission.isShown ? 'Hide' : 'Show')} {title}
    </Button>
  ) : '';

  const apiParams = {
    limit: submission.limit,
  };

  if (typeof userId !== 'undefined') {
    apiParams.userId = userId;
  }

  return (
    <div className={cx(s.root, className)}>
      <div className={s.container}>
        {visibilityToggleButton}
        <Panel collapsible expanded={submission.isShown}>
          <Row>
            <Col xs={12} sm={6}>
              <h2 className={s.title}>{title}</h2>
            </Col>
            <Col xs={12} sm={6}>
              <RadioButtons className={s.limitButtons} label="SHOW:" items={limits} active={submission.limit} onChange={setSubmissionLimit} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <SubmissionTable apiParams={apiParams} submission={submission} getSubmissions={getSubmissions} />
            </Col>
          </Row>
        </Panel>
      </div>
    </div>
  );
}

SubmissionTablePanel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.int,
  visibilityToggle: PropTypes.bool,
  limits: PropTypes.arrayOf(PropTypes.int),
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

export default withStyles(SubmissionTablePanel, s);
