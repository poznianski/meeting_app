import React from 'react';

export const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number === 1) {
      return "person is"
    } else {
      return "people are"
    }
  }
  
  return (
    <h2>
        <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
          {length > 0
            ? `${length} ${renderPhrase(length)} ready to hang out with you today`
            : "nobody can hang out with you today=("
          }
        </span>
    </h2>
  )
}
