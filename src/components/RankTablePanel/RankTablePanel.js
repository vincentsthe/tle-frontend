import React, { PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RankTablePanel.scss';
import cx from 'classnames';

import { Row, Col, Panel, Button } from 'react-bootstrap';
import RankTable from '../../components/RankTable';
import RadioButtons from '../../components/RadioButtons';

function RankTablePanel({ className, userId, userRank, title, limits, rank, getRanks, setRankAbove, setRankBelow }) {
  const apiParams = {
    start: userRank - rank.below,
    limit: rank.above + rank.below + (userId ? 1 : 0),
  };

  if (typeof userId !== 'undefined') {
    apiParams.userId = userId;
  }

  let belowButtons = '';
  if (typeof setRankBelow === 'function') {
    belowButtons = <RadioButtons className={s.belowButtons} label="BELOW:" items={limits} active={rank.below} onChange={setRankBelow} />;
  }

  let aboveButtons = '';
  let aboveLabel = 'ABOVE:';
  if (typeof setRankAbove === 'function') {
    if (typeof setRankBelow !== 'function') {
      aboveLabel = 'TOP';
    }
    aboveButtons = <RadioButtons className={s.aboveButtons} label={aboveLabel} items={limits} active={rank.above} onChange={setRankAbove} />;
  }

  return (
    <div className={s.root}>
      <div className={cx(s.container, className)}>
        <Panel collapsible expanded={true}>
          <Row>
            <Col xs={12} sm={4}>
              <h2 className={s.title}>{title}</h2>
            </Col>
            <Col xs={12} sm={8}>
              {belowButtons}
              {aboveButtons}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RankTable apiParams={apiParams} rank={rank} getRanks={getRanks} />
            </Col>
          </Row>
        </Panel>
      </div>
    </div>
  );
}

RankTablePanel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.int,
  limits: PropTypes.arrayOf(PropTypes.int),
  rank: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.int,
      name: PropTypes.string,
      username: PropTypes.string,
      acceptedProblem: PropTypes.int,
      acceptedSubmission: PropTypes.int,
      totalSubmission: PropTypes.int,
    })).isRequired,
    start: PropTypes.int,
    limit: PropTypes.int,
    isPending: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    error: PropTypes.any,
  }),
  getRanks: PropTypes.func.isRequired,
  setRankAbove: PropTypes.func,
  setRankBelow: PropTypes.func,
};

export default withStyles(RankTablePanel, s);
