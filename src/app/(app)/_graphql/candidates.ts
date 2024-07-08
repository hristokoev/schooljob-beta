import { MEDIA_FIELDS } from "./media"
import { SALARY } from "./salary"

export const CANDIDATE = `
query Candidates {
  Candidates {
    docs {
			jobsSaved {
        ...on Job {
          id
          publicId
          slug
          title
          ${SALARY}
          employmentType
          location
          createdAt
          featured
          applications {
            id
          }
          organization {
            slug
            title
            logo {
              ${MEDIA_FIELDS}
            }
            imageCover {
              ${MEDIA_FIELDS}
            }
          }
        }
      }
    }
  }
} 
`
