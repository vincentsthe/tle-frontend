import React, { PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProblemRecommendationTablePanel.scss';
import cx from 'classnames';

import { Row, Col, Panel, Button } from 'react-bootstrap';
import ProblemRecommendationTable from '../../components/ProblemRecommendationTable';
import RadioButtons from '../../components/RadioButtons';

function ProblemRecommendationTablePanel({ className, userId, title, limits, recommendation, getRecommendations, setRecommendationLimit }) {
  const apiParams = {
    limit: recommendation.limit,
  };

  if (typeof userId !== 'undefined') {
    apiParams.userId = userId;
  }

  return (
    <div className={s.root}>
      <div className={cx(s.container, className)}>
        <Panel collapsible expanded={true}>
          <Row>
            <Col xs={12} sm={6}>
              <h2 className={s.title}>{title}</h2>
            </Col>
            <Col xs={12} sm={6}>
              <RadioButtons className={s.limitButtons} label="SHOW:" items={limits} active={recommendation.limit} onChange={setRecommendationLimit} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ProblemRecommendationTable apiParams={apiParams} recommendation={recommendation} getRecommendations={getRecommendations} />
            </Col>
          </Row>
        </Panel>
      </div>
    </div>
  );
}

ProblemRecommendationTablePanel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.int,
  visibilityToggle: PropTypes.bool,
  limits: PropTypes.arrayOf(PropTypes.int),
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
  getRecommendations: PropTypes.func.isRequired,
  setRecommendationLimit: PropTypes.func.isRequired,
};

export default withStyles(ProblemRecommendationTablePanel, s);
