import React from "react";
import { Pagination } from "react-bootstrap";

export default function CustomPagination({ meta, onPageChange }) {
  const { current_page, last_page } = meta;
  let items = [];

  const range = 2;

  // Page 1
  items.push(
    <Pagination.Item
      key={1}
      active={current_page === 1}
      onClick={() => onPageChange(1)}
    >
      1
    </Pagination.Item>
  );

  // Ellipsis before current page - range
  if (current_page - range > 2) {
    items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
  }

  // Pages around current page
  for (
    let number = Math.max(2, current_page - range);
    number <= Math.min(last_page - 1, current_page + range);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === current_page}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Ellipsis after current page + range
  if (current_page + range < last_page - 1) {
    items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
  }

  // Last page
  if (last_page > 1) {
    items.push(
      <Pagination.Item
        key={last_page}
        active={current_page === last_page}
        onClick={() => onPageChange(last_page)}
      >
        {last_page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => current_page > 1 && onPageChange(current_page - 1)}
        disabled={current_page === 1}
      />
      {items}
      <Pagination.Next
        onClick={() =>
          current_page < last_page && onPageChange(current_page + 1)
        }
        disabled={current_page === last_page}
      />
    </Pagination>
  );
}
