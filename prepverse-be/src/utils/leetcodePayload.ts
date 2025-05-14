export const getLeetcodePayload = (skip: number) => ({
  operationName: "problemsetQuestionListV2",
  query: `
      query problemsetQuestionListV2($limit: Int, $skip: Int) {
        problemsetQuestionListV2(
          limit: $limit,
          skip: $skip
        ) {
          questions {
            id
            title
            titleSlug
            questionFrontendId
            difficulty
            paidOnly
            topicTags {
              name
              slug
            }
            status
            acRate
          }
          hasMore
        }
      }
    `,
  variables: {
    skip,
    limit: 100
  }
});


export const getLeetcodeStatsPayload = (username: string) => ({
  operationName: "userProfile",
  variables: { username },
  query: `
  query userProfile($username: String!) {
      matchedUser(username: $username) {
          username
          submitStatsGlobal {
              acSubmissionNum {
                  difficulty
                  count
              }
              totalSubmissionNum {
                  difficulty
                  count
              }
          }
          userCalendar {
              streak
              activeYears
          }
          contestBadge {
              name
          }
      }
  }
`
})