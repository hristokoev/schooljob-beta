import { SALARY } from "./salary"

export const APPLICATIONS = `
query Applications {
  Applications {
    docs {
      id
      status
      trackingId
      createdAt
      firstName
      lastName
      job {
        ...on Job {
          slug
          publicId
          title
          ${SALARY}
          location
        }
      }
      candidate {
        ...on Candidate {
          firstName
          lastName
        }
      }
    }
  }
}
`

export const APPLICATION = `
query Application($trackingId: Float) {
  Applications(where: { trackingId: { equals: $trackingId } }, limit: 1) {
    docs {
      id
      status
      firstName
      lastName
      email
      phone
      location
      coverLetter
      cv {
        filename
        mimeType
        filesize
      }
      job {
        title
        slug
        publicId
        organization {
          title
          slug
        }
      }
    }
  }
}
`
