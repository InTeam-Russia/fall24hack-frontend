export const objectToQueryString = (queryParameters: Record<string, string | number>): string => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val]) => {
        const symbol = queryString.length === 0 ? '?' : '&';
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            val.forEach((value) => {
              if (value !== undefined && value !== null) {
                queryString += `${symbol}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
              }
            });
          } else {
            queryString += `${symbol}${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
          }
        }
        return queryString;
      }, '')
    : '';
};
