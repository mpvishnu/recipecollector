import React from "react";

const ratingContext = React.createContext({
  reviews: [],
  emptyResponses: [],
  flag: false
});

export default ratingContext;
