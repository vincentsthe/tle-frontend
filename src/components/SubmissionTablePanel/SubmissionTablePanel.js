import React, { PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SubmissionTablePanel.scss';

import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import SubmissionTable from '../../components/SubmissionTable';
import RadioButtons from '../../components/RadioButtons';

function SubmissionTablePanel({ isShown, activeLimit, limits, setSubmissionLimit, setSubmissionShown }) {
  return (
    <div className={s.root}>
      <Grid className={s.container}>
        <Row>
          <Col xs={12}>
            <Button bsStyle={(isShown ? 'default' : 'primary')} onClick={() => setSubmissionShown(!isShown)} block>
              {(isShown ? 'Hide' : 'Show')} Live Submission
            </Button>
            <Panel collapsible expanded={isShown}>
              <Row>
                <Col xs={12} sm={6}>
                  <h2 className={s.title}>Live Submissions</h2>
                </Col>
                <Col xs={12} sm={6}>
                  <RadioButtons className={s.limitButtons} label="SHOW:" items={limits} active={activeLimit} onChange={setSubmissionLimit} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <SubmissionTable isPolling={isShown} apiParams={{ limit: activeLimit }} />
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

SubmissionTablePanel.propTypes = {
  isShown: PropTypes.bool,
  activeLimit: PropTypes.int,
  limits: PropTypes.arrayOf(PropTypes.int),
  setSubmissionLimit: PropTypes.func.isRequired,
  setSubmissionShown: PropTypes.func.isRequired,
};

export default withStyles(SubmissionTablePanel, s);
