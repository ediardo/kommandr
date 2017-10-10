import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = (props) => {
  const { type, resource } = props;
  switch (type) {
    case 'kommandr':
      return <Link to={`/k/${resource}`} onClick={(e) => {e.preventDefault(); props.history.push(`/k/${resource}`)}}>{props.children}</Link>
  }
};

const SearchResult = (props) => {
  const { type, avatarUrl, title, createdAt, updatedAt } = props;
  
  return (
    <li className="result-item">
      <span>
        {title}
      </span>
    </li>
  )
};

export default SearchResult;