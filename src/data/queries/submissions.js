import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import SubmissionType from '../types/SubmissionType';
import { submissionApiUrl } from '../../config';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const submissions = {
  type: new List(SubmissionType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(submissionApiUrl)
        .then(response => response.json())
        .then(data => {
          items = data;

          return items;
        })
        .finally(() => {
          lastFetchTask = null;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default submissions;
