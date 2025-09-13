import styled from "styled-components";

const FilterBar = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

function Filter({ handleFilterChange, filterStatus }) {
  return (
    <FilterBar>
      <FilterSelect value={filterStatus} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
        <option value="rejected">Rejected</option>
      </FilterSelect>
    </FilterBar>
  );
}

export default Filter;
