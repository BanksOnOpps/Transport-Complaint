import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import useFeedback from "./useFeedback";
import { useDeleteReport } from "./useDeleteReport";
import { HiMiniXMark } from "react-icons/hi2";
import { HiMiniEye } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useState } from "react";
import { updateStatus } from "../../services/apiReport";
import CheckComplaint from "./CheckComplaint";
import Filter from "../../ui/Filter";

const Container = styled.div`
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: var(--color-admin-gradient);

  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 0.375rem;
  transition: all 160ms ease-in;
  &:hover {
    background: var(--color-adminHover-gradient);
  }
`;

const ComplaintCard = styled.div`
  background-color: #f9fbfd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  gap: 1.5rem;
  color: #1f2937;
  max-height: 400px;
  overflow-y: auto;
`;

const ComplaintHeader = styled.div`
  background: var(--color-admin-gradient);
  display: grid;
  grid-template-columns: 40px repeat(5, 1fr) 40px;

  grid-template-rows: auto auto;
  padding: 1.5rem;
  border-radius: 10px;
`;

const DetailCard = styled.div`
  display: grid;

  grid-template-columns: 40px repeat(5, 1fr) 40px;
  grid-template-rows: auto auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-height: 100px;
  cursor: pointer;
`;

const StatBox = styled.div`
  text-align: center;
  border-right: 1px solid #e5e7eb;
  &:last-child {
    border-right: none;
  }
`;

const StatTop = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-300);
`;

const DetailRow = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const DetailItem = styled.div`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const Status = styled.span`
  padding: 4px 10px;
  font-size: 1.3rem;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--color-grey-50);
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

const HeaderTitle = styled.h3`
  margin-bottom: 1.5rem;
  background: var(--color-admin-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 4px;
  column-gap: 40px;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: 100px;
  cursor: pointer;
`;

const SpanRow = styled.div`
  grid-column: 1 / -1;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-bottom: 1.5px;
`;

const Select = styled.select`
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  padding: 1px;
  outline: none;
`;

const ErrorMessage = styled.p`
  color: #631919;
  font-size: 1rem;
`;

const StatusForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

function ComplaintTable() {
  const [filterStatus, setFilterStatus] = useState("all");
  const { isLoading, complaints } = useFeedback(filterStatus);
  const { isDeleting, deleteReport } = useDeleteReport();
  const [viewComplaint, setViewComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, control, formState } = useForm();
  const selectedStatus = useWatch({ control, name: "status" });
  const queryClient = useQueryClient();
  const { errors } = formState;

  function handleFilterChange(e) {
    setFilterStatus(e.target.value);
  }

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      toast.success("Status successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });
      setShowModal(false);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleView(complaint) {
    setViewComplaint(complaint);
    setShowModal(true);
  }

  function handleUpdate() {
    if (!selectedStatus) return;
    mutate({ id: viewComplaint.id, status: selectedStatus });
  }

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <CheckComplaint />
      <Filter
        handleFilterChange={handleFilterChange}
        filterStatus={filterStatus}
      />
      <ComplaintCard>
        <ComplaintHeader>
          <StatBox>
            <StatTop></StatTop>
          </StatBox>
          <StatBox>
            <StatTop>Time</StatTop>
          </StatBox>
          <StatBox>
            <StatTop>Date</StatTop>
          </StatBox>
          <StatBox>
            <StatTop>Complaint</StatTop>
          </StatBox>
          <StatBox>
            <StatTop>Location</StatTop>
          </StatBox>
          <StatBox>
            <StatTop>Status</StatTop>
          </StatBox>
          <StatBox>
            <StatTop></StatTop>
          </StatBox>
        </ComplaintHeader>

        <DetailRow>
          {complaints.map((complaint) => (
            <DetailCard key={complaint.id}>
              <DetailItem
                title="Delete"
                onClick={() => deleteReport(complaint.id)}
                disabled={isDeleting}
              >
                <HiMiniTrash />
              </DetailItem>
              <DetailItem>{complaint.time}</DetailItem>
              <DetailItem>{complaint.date}</DetailItem>
              <DetailItem>{complaint.complaintType}</DetailItem>
              <DetailItem>{complaint.location}</DetailItem>
              <DetailItem>
                <Status
                  color={
                    complaint.status === "pending"
                      ? "yellow"
                      : complaint.status === "resolved"
                      ? "green"
                      : "red"
                  }
                >
                  #{complaint.status}
                </Status>
              </DetailItem>
              <DetailItem title="Preview" onClick={() => handleView(complaint)}>
                <HiMiniEye />
              </DetailItem>
            </DetailCard>
          ))}
        </DetailRow>

        {showModal && viewComplaint && (
          <ModalOverlay onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={() => setShowModal(false)}>
                <HiMiniXMark />
              </CloseButton>
              <HeaderTitle>Complaint Details</HeaderTitle>
              <Details>
                <p>
                  <strong>📅 Date:</strong> {viewComplaint.date}
                </p>
                <p>
                  <strong> ⏰ Time:</strong> {viewComplaint.time}
                </p>
                <SpanRow>
                  <strong>🎙️ Type:</strong> {viewComplaint.complaintType}
                </SpanRow>
                <p>
                  <strong>📍 Location:</strong> {viewComplaint.location}
                </p>
                <p>
                  <strong>🚒 Driver:</strong> {viewComplaint.driverId}
                </p>
                <p>
                  <strong>📟 Plate No:</strong> {viewComplaint.plateNo}
                </p>
                <p>
                  <strong>🏷️ Status:</strong> {viewComplaint.status}
                </p>
              </Details>
              <Card>{viewComplaint.description}</Card>
              <StatusForm onSubmit={handleSubmit(handleUpdate)}>
                <SelectContainer>
                  <Select
                    {...register("status", {
                      required: "This field is required",
                    })}
                    defaultValue=""
                  >
                    <option value="">Add status</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="resolved">Resolved</option>
                  </Select>
                  {errors.status && (
                    <ErrorMessage>{errors.status.message}</ErrorMessage>
                  )}
                </SelectContainer>

                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
              </StatusForm>
            </ModalContent>
          </ModalOverlay>
        )}
      </ComplaintCard>
    </Container>
  );
}

export default ComplaintTable;
