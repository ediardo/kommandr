import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginator = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total/pageSize);
  if (totalPages <= 1) return null;  
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <PaginationItem active={currentPage === i} key={i}>
        <PaginationLink onClick={(e) => onPageChange(i)} >{i}</PaginationLink>
      </PaginationItem>
    );
  }
  return (
    <Pagination>
      <PaginationItem disabled={(currentPage === 1) ? true: undefined}>
        <PaginationLink onClick={() => onPageChange(1)}>previous</PaginationLink>
      </PaginationItem>
      {pageButtons}
      <PaginationItem disabled={(currentPage === totalPages) ? true : undefined}>
        <PaginationLink onClick={() => onPageChange(totalPages) }>next</PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

Paginator.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

Paginator.defaultProps = {
  total: 0,
  pageSize: 10,
  currentPage: 1,
};

export default Paginator;