import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProblemRecommendationTable.scss';

import { Table } from 'react-bootstrap';

class ProblemRecommendationTable extends Component {
  componentDidMount() {
    const { getRecommendations, apiParams } = this.props;
    getRecommendations(apiParams);
  }

  componentWillReceiveProps(nextProps) {
    const shouldUpdate = this.props.apiParams.userId !== nextProps.apiParams.userId ||
                         this.props.apiParams.limit !== nextProps.apiParams.limit;
    if (shouldUpdate) {
      nextProps.getRecommendations(nextProps.apiParams);
    }
  }

  displayData() {
    const { data, isPending } = this.props.recommendation;
    if (data.length > 0) {
      let key = 0;
      return (
        data.map(row => {
          key++;
          return (
            <tr key={key}>
              <td>{key}</td>
              <td><a href={row.url}>{row.slug}</a></td>
              <td>{row.acceptedUser}</td>
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
            <th>No</th>
            <th>Problem Title</th>
            <th>Accepted Users</th>
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

ProblemRecommendationTable.propTypes = {
  apiParams: PropTypes.shape({
    limit: PropTypes.int,
    userId: PropTypes.int,
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
  getRecommendations: PropTypes.func.isRequired,
};

export default withStyles(ProblemRecommendationTable, s);
