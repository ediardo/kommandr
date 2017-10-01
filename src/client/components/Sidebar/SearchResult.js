import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = (props) => {
  const { type, resource } = props;
  switch (type) {
    case 'user':
      return <Link to={`/u/${resource}`}>{props.children}</Link>
    case 'kommandr':
      return <Link to={`/k/${resource}`}>{props.children}</Link>
    case 'collection':
      return <Link to={`/c/${resource}`}>{props.children}</Link>
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