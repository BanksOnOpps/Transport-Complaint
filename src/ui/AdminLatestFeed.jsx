import React, { useState } from "react";
import styled from "styled-components";
import { BsGrid3X3Gap, BsCardList } from "react-icons/bs";
import { FiEdit, FiShare2, FiPlus, FiFilter } from "react-icons/fi";
import { HiAdjustmentsHorizontal, HiEye, HiMiniXMark } from "react-icons/hi2";
import useFeedback from "../features/feedback/useFeedback";
import SpinnerMini from "./SpinnerMini";
import { useNavigate } from "react-router-dom";

// ========== Styled Components ==========

const Wrapper = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.h3`
  color: #111;
  font-size: 1.7rem;
  word-spacing: 2px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const FilterWrapper = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #707070;
  & svg {
    color: orange;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
  min-width: 140px;
  overflow: hidden;
`;

const FilterItem = styled.div`
  padding: 0.7rem 1rem;
  cursor: pointer;
  font-size: 0.85rem;
  color: #444;
  transition: background 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;

const AssignmentWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MyReportCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  padding: 1rem 1.25rem;
  margin-left: 5px;
  background-color: #ffffff;

  border-radius: 10px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

const CardStyle = styled.div`
  background: var(--color-brand-900);
  border-radius: 10px;
`;

const IconArea = styled.div`
  font-size: 2rem;
`;

const InfoArea = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-size: 1.2rem;
  margin: 0;
  text-transform: uppercase;
`;

const SubText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0.25rem 0 0;
`;

const ReportInfo = styled.div`
  text-transform: uppercase;
  small {
    font-size: 1rem;
    color: #999;
  }
  strong {
    display: block;
    font-size: 0.85rem;
    color: #333;
  }
`;

const StudentView = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: 100px;
  cursor: pointer;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 4px;
  column-gap: 40px;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SpanRow = styled.div`
  grid-column: 1 / -1;
`;

const StatusText = styled.div`
  display: block;
  font-size: 0.85rem;
  gap: 6px;
  color: ${(props) =>
    props.$status === "pending"
      ? "#ca8a04" // yellow
      : props.$status === "resolved"
      ? "#059669" // green
      : "#b91c1c"}; // red
`;

const HeaderTitle = styled.h3`
  margin-bottom: 1.5px;
  color: orange;
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

const AddNew = styled.button`
  margin-top: 2rem;
  border: 2px dashed #ccc;
  padding: 1rem;
  border-radius: 14px;
  width: 100%;
  background: #fff;
  color: #333;
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

function AdminLatestFeed() {
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const { isLoading, complaints } = useFeedback(filterStatus);
  const [viewComplaint, setViewComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function addNewReport() {
    navigate("/admin/complaints", { replace: true });
  }

  function handleFilterView() {
    setShowFilter((prev) => !prev);
  }

  function handleView(complaint) {
    setViewComplaint(complaint);
    setShowModal(true);
  }

  if (isLoading) return <SpinnerMini />;

  return (
    <Wrapper>
      <Header>
        <CardText>My Reports</CardText>
        <HeaderActions>
          <FilterWrapper>
            <FilterButton onClick={handleFilterView}>
              <HiAdjustmentsHorizontal /> Sort by
            </FilterButton>
            {showFilter && (
              <Dropdown>
                <FilterItem
                  onClick={() => {
                    setFilterStatus("all");
                    setShowFilter(false);
                  }}
                >
                  📋 All
                </FilterItem>
                <FilterItem
                  onClick={() => {
                    setFilterStatus("pending");
                    setShowFilter(false);
                  }}
                >
                  🕒 Pending
                </FilterItem>
                <FilterItem
                  onClick={() => {
                    setFilterStatus("resolved");
                    setShowFilter(false);
                  }}
                >
                  ✅ Resolved
                </FilterItem>
                <FilterItem
                  onClick={() => {
                    setFilterStatus("rejected");
                    setShowFilter(false);
                  }}
                >
                  ❌ Rejected
                </FilterItem>
              </Dropdown>
            )}
          </FilterWrapper>
        </HeaderActions>
      </Header>

      <AssignmentWrapper>
        {complaints.slice(0, 3).map((complaint) => (
          <CardStyle key={complaint.id}>
            <MyReportCard>
              <HiEye onClick={() => handleView(complaint)} />
              <InfoArea>
                <Title>{complaint.complaintType}</Title>
                <SubText>{complaint.date}</SubText>
              </InfoArea>
              <ReportInfo>
                <small>Duration</small>
                <strong>{complaint.time}</strong>
              </ReportInfo>
              <ReportInfo>
                <small>Status</small>
                <StatusText $status={complaint.status}>
                  #{complaint.status}
                </StatusText>
              </ReportInfo>
            </MyReportCard>
          </CardStyle>
        ))}
      </AssignmentWrapper>

      <AddNew onClick={addNewReport}>
        <FiPlus />
        View more complaints
      </AddNew>

      {showModal && viewComplaint && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>
              <HiMiniXMark />
            </CloseButton>
            <HeaderTitle>Report Details</HeaderTitle>
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
            <StudentView>{viewComplaint.description}</StudentView>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}

export default AdminLatestFeed;
