import {
  GraphQLObjectType as ObjectType,
  GraphQLID as IdType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const SubmissionType = new ObjectType({
  name: 'SubmissionItem',
  fields: {
    id: { type: new NonNull(IdType) },
    problemId: { type: new NonNull(IntType) },
    problemSlug: { type: StringType },
    name: { type: StringType },
    username: { type: StringType },
    verdictCode: { type: StringType },
    verdictName: { type: StringType },
    language: { type: StringType },
    score: { type: IntType },
    submitTime: { type: IntType },
  },
});

export default SubmissionType;
