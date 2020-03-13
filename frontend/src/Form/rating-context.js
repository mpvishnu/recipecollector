import React from "react";

const ratingContext = React.createContext({
  reviews: [],
  emptyResponses: [],
  flag: false,
  duplicates: true,
  numResponses: 0
});

export default ratingContext;
