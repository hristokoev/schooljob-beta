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
  $location: [Organization_location_Input]
  $categories: [Organization_categories_Input]
) {
  Organizations(
    limit: $limit
    page: $page
    sort: $sort
    where: {
      OR: [
        { location: { in: $location } }
        { categories: { in: $categories } }
      ]
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
    totalDocs
    limit
    totalPages
    page
    pagingCounter
    hasPrevPage
    hasNextPage
    prevPage
    nextPage
  }
}
`

