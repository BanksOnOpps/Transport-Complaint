import styled from "styled-components";

import Spinner from "../../ui/Spinner";

import { useDeleteReport } from "./useDeleteReport";
import { HiCalendar, HiMapPin, HiMiniClock } from "react-icons/hi2";

const Container = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  cursor: pointer;
`;

const IconText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* min-width: 180px; */

  svg {
    font-size: 2rem; /* slightly adjust if needed */
    color: var(--color-card-1);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: #4b5563; /* gray-600 */
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.span`
  font-weight: 600;
`;

const DeleteButton = styled.button`
  background-color: #eef2ff;
  color: #4f46e5;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 8px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.color === "yellow"
      ? "#fef3c7" // pending
      : props.color === "red"
      ? "#fee2e2" // rejected
      : "#d1fae5"}; // resolved (green)

  color: ${(props) =>
    props.color === "yellow"
      ? "#ca8a04"
      : props.color === "red"
      ? "#b91c1c"
      : "#059669"};
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #6b7280; /* gray-500 */
  margin-top: 8px;
`;

function FeedbackTable({ isLoading, complaints }) {
  const { isDeleting, deleteReport } = useDeleteReport();

  if (isLoading) return <Spinner />;

  return (
    <Container role="table">
      {complaints.map((complaint) => (
        <Card key={complaint.id}>
          <Row role="row">
            <IconText>
              <HiMiniClock />
              {complaint.time}
            </IconText>
            <IconText>
              <HiCalendar />
              {complaint.date}
            </IconText>
            <Title>{complaint.complaintType}</Title>
            <IconText>
              <HiMapPin />
              {complaint.location}
            </IconText>
            <DeleteButton
              onClick={() => deleteReport(complaint.id)}
              disabled={isDeleting}
            >
              Delete
            </DeleteButton>
          </Row>
          <Tags>
            <Tag
              color={
                complaint.status === "pending"
                  ? "yellow"
                  : complaint.status === "resolved"
                  ? "green"
                  : "red"
              }
            >
              #{complaint.status}
            </Tag>
          </Tags>
          <Description>{complaint.description}</Description>
        </Card>
      ))}
    </Container>
  );
}

export default FeedbackTable;
