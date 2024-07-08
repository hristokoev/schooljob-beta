export const JOB_CATEGORIES = `
query JobCategories {
    JobCategories(limit: 100) {
      docs {
        id
        title
        slug
      }
    }
  }
`
