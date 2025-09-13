import styled from "styled-components";
import useFeedback from "./useFeedback";

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: ${(props) => props.$columns || "1fr"};
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background-color: ${(props) => props.$bg || "var(--color-grey-0)"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.8rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  /* color: var(--color-grey-50); */
  color: var(--color-grey-100);
`;

const Count = styled.span`
  font-size: 2rem;
  border-radius: var(--border-radius-tiny);
  font-weight: bold;
  padding: 0.8rem 1rem;
  background-color: ${(props) => props.$bg || "var(--color-grey-100)"};
`;

const Label = styled.span`
  font-size: 1.8rem;
  opacity: 0.9;
  color: black;
  display: flex;
  align-items: center;
`;

function CheckComplaint() {
  const { complaints = [] } = useFeedback();
  const totalComplaint = complaints.length;

  const pendingComplaint = complaints.filter(
    (pending) => pending.status === "pending"
  ).length;
  const resolvedComplaint = complaints.filter(
    (resolved) => resolved.status === "resolved"
  ).length;
  const rejectedComplaint = complaints.filter(
    (rejected) => rejected.status === "rejected"
  ).length;

  return (
    <Grid $columns="repeat(4, 1fr)">
      <Card>
        <Count $bg="var(--color-card-5)">{totalComplaint}</Count>
        <Label>All</Label>
      </Card>

      <Card>
        <Count $bg="var(--color-card-6)">{pendingComplaint}</Count>
        <Label>Pending</Label>
      </Card>

      <Card>
        <Count $bg="var(--color-card-7)">{resolvedComplaint}</Count>
        <Label>Resolved</Label>
      </Card>

      <Card>
        <Count $bg="var(--color-card-8)">{rejectedComplaint}</Count>
        <Label>Rejected</Label>
      </Card>
    </Grid>
  );
}

export default CheckComplaint;
