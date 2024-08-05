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
  $location: [Organization_location_Input]
  $categories: [Organization_categories_Input]
) {
  Organizations(
    limit: $limit
    page: $page
    sort: $sort
    where: { 
      featured: { equals: $featured }
      location: { all: $location }
      categories: { all: $categories }
    }
  ) {
    docs {
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

