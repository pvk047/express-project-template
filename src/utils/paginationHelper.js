function getTotalNumberOfPages(count, limit) {
  let totalPages = 0
  if (count) {
    totalPages = (limit && Math.ceil(count / limit)) || 1
  }
  return totalPages
}

function getHasMore(skip, dataLength, count) {
  let hasMore = false
  if (skip !== undefined && skip !== null) {
    hasMore = skip + dataLength < count
  }
  return hasMore
}

function getPaginationResponse({
  page = 1,
  count,
  limit = 10,
  skip,
  data,
  data_field: dataField,
  message,
}) {
  const hasMore = getHasMore(skip, data.length, count)
  const totalPages = getTotalNumberOfPages(count, limit)
  return {
    has_more: hasMore,
    total: count,
    page,
    limit: limit || 0,
    total_pages: totalPages,
    success: true,
    message,
    [dataField]: data,
  }
}

export { getTotalNumberOfPages, getHasMore, getPaginationResponse }
