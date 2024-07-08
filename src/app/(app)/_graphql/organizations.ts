import { MEDIA_FIELDS } from "./media"

export const ORGANIZATIONS_STATIC_PARAMS = `
query Organizations {
  Organizations(limit: 300) {
    docs {
      slug
    }
  }
}
`

export const ORGANIZATIONS = `
query Organizations(
  $limit: Int
  $page: Int
  $sort: String
  $featured: Boolean
) {
  Organizations(
    limit: $limit
    page: $page
    sort: $sort
    where: { 
      featured: { equals: $featured }
    }
  ) {
    docs {
      id
      slug
      title
      description
      location
      featured
      logo {
        ${MEDIA_FIELDS}
      }
      imageCover {
        ${MEDIA_FIELDS}
      }
      jobsPublished {
        id
      }
    }
  }
}
`

export const ORGANIZATION = `
query Organization($slug: String) {
  Organizations(where: { slug: { equals: $slug }}, limit: 1) {
    docs {
      id
      title
      richText
      location
      featured
      logo {
        ${MEDIA_FIELDS}
      }
      imageCover {
        ${MEDIA_FIELDS}
      }
      jobsPublished {
        id
      }
      jobsUnpublished {
        id
      }
      url
    }
  }
}
`
