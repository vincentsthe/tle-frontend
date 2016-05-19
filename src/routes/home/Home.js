import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

import RankTablePanel from '../../components/RankTablePanel';
import * as TopRankAction from '../../actions/topRankAction';

function Home({
  rank, getRanks, setRankAbove, setRankBelow,
}) {
  const rankLimits = [5, 10, 25, 50, 100];
  return (
    <div className={s.root}>
      <div className={s.rankTable}>
        <RankTablePanel
          title="Hall of Fame"
          rank={rank}
          limits={rankLimits}
          getRanks={getRanks}
          setRankAbove={setRankAbove}
          userRank={1}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { rank } = state.topRank;

  return {
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
  return bindActionCreators({...TopRankAction}, dispatch);
}

Home.propTypes = {
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
  getRanks: PropTypes.func.isRequired,
  setRankAbove: PropTypes.func.isRequired,
  setRankBelow: PropTypes.func.isRequired,
};

export default withStyles(connect(mapStateToProps, mapDispatchToProps)(Home), s);
