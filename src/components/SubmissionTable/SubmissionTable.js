import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SubmissionTable.scss';

import { Table } from 'react-bootstrap';

class SubmissionTable extends Component {
  componentDidMount() {
    const { getSubmissions, apiParams } = this.props;
    const { isPolling } = this.props.submission;
    getSubmissions(apiParams);

    if (isPolling) {
      this.refreshInterval = setInterval(() => {
        getSubmissions(apiParams);
      }, 2000);
    }
  }

  componentWillReceiveProps(nextProps) {
    const shouldUpdate = this.props.apiParams.problemId !== nextProps.apiParams.problemId ||
                         this.props.apiParams.userId !== nextProps.apiParams.userId ||
                         this.props.apiParams.limit !== nextProps.apiParams.limit ||
                         this.props.submission.isPolling !== nextProps.submission.isPolling;
    if (shouldUpdate) {
      nextProps.getSubmissions(nextProps.apiParams);
      if (nextProps.submission.isPolling) {
        clearInterval(this.refreshInterval);
        this.refreshInterval = setInterval(() => {
          nextProps.getSubmissions(nextProps.apiParams);
        }, 2000);
      } else {
        clearInterval(this.refreshInterval);
      }
    }
  }

  formatTime(time) {
    const timeMs = time * 1000;
    const fullDate = new Date(timeMs);
    const currentDate = Date.now();
    const timeDiffMs = currentDate - timeMs;
    const timeToFormat = new Date(timeDiffMs);
    if (timeDiffMs / 1000 < 59) {
      return `${timeToFormat.getSeconds()} secs ago`;
    } else if (timeDiffMs / 60000 < 59) {
      return `${timeToFormat.getMinutes()} mins ago`;
    } else if (timeDiffMs / 3600000 < 24) {
      return `${timeToFormat.getHours()} hours ago`;
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`;
  }

  displayData() {
    const { data, isPending } = this.props.submission;
    if (data.length > 0) {
      let key = 0;
      return (
        data.map(row => {
          key++;
          return (
            <tr key={key}>
              <td>{row.name} ({row.username})</td>
              <td>{row.problemSlug}</td>
              <td className={(row.verdictName === 'Accepted' ? s.greenText : s.redText)}>{row.verdictName}</td>
              <td>{row.score}</td>
              <td>{this.formatTime(row.submitTime)}</td>
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
            <th>User</th>
            <th>Problem Title</th>
            <th>Verdict</th>
            <th>Score</th>
            <th>Submit Time</th>
          </tr>
        </thead>
        <tbody>
          {this.displayData()}
        </tbody>
      </Table>
    );
  }
}

SubmissionTable.propTypes = {
  apiParams: PropTypes.shape({
    limit: PropTypes.int,
    userId: PropTypes.int,
    problemId: PropTypes.int,
  }),
  submission: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      problemSlug: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string,
      verdictName: PropTypes.string,
      score: PropTypes.int,
      submitTime: PropTypes.int,
    })).isRequired,
    isPolling: PropTypes.bool,
    isPending: PropTypes.bool,
    isFulfilled: PropTypes.bool,
    error: PropTypes.any,
  }),
  getSubmissions: PropTypes.func.isRequired,
};

export default withStyles(SubmissionTable, s);
