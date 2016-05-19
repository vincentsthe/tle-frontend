import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RankTable.scss';

import { Table } from 'react-bootstrap';

class RankTable extends Component {
  componentDidMount() {
    const { getRanks, apiParams } = this.props;
    getRanks(apiParams);
  }

  componentWillReceiveProps(nextProps) {
    const shouldUpdate = this.props.apiParams.userId !== nextProps.apiParams.userId ||
                         this.props.apiParams.start !== nextProps.apiParams.start ||
                         this.props.apiParams.limit !== nextProps.apiParams.limit;
    if (shouldUpdate) {
      nextProps.getRanks(nextProps.apiParams);
    }
  }

  displayData() {
    const { data, isPending } = this.props.rank;
    const { start, userId } = this.props.apiParams;
    if (data.length > 0) {
      let key = start - 1;
      return (
        data.map(row => {
          key++;
          return (
            <tr key={key} className={(row.id === userId) ? s.boldText : ''}>
              <td>{key}</td>
              <td>{row.name} ({row.username})</td>
              <td>{row.acceptedProblem}</td>
              <td>{row.acceptedSubmission}</td>
              <td>{row.totalSubmission}</td>
            </tr>
          );
        })
      );
    } else if (isPending) {
      return (
        <tr>
          <td colSpan="5" className={s.alignCenter}>Loading...</td>
        </tr>
      );
    }

    return (
      <tr>
        <td colSpan="5" className={s.alignCenter}>No Data</td>
      </tr>
    );
  }

  render() {
    return (
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Accepted Problems</th>
            <th>Accepted Submissions</th>
            <th>Total Submissions</th>
          </tr>
        </thead>
        <tbody>
          {this.displayData()}
        </tbody>
      </Table>
    );
  }
}

RankTable.propTypes = {
  apiParams: PropTypes.shape({
    start: PropTypes.int,
    limit: PropTypes.int,
    userId: PropTypes.int,
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
    limit: PropTypes.int,
    isPending: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    error: PropTypes.any,
  }),
  getRanks: PropTypes.func.isRequired,
};

export default withStyles(RankTable, s);
