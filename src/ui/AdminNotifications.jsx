import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import {
  clearAllAdminNotifications,
  getAdminNotifications,
} from "../services/apiReport";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiBellAlert } from "react-icons/hi2";
import toast from "react-hot-toast";

const NotificationsCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const NotifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin-bottom: 10px;

  span {
    font-size: 1.2rem;
    color: #707070;
    cursor: pointer;
  }
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #111;
  font-size: 1.7rem;
  word-spacing: 2px;

  & svg {
    color: orange;
  }
`;

const NotifCard = styled.div`
  background: #f8f9fa;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 12px;
`;

const NotifTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 1.2rem;
  }

  svg {
    font-size: 1.2rem;
    color: #666;
  }
`;

const NotifText = styled.p`
  font-size: 0.85rem;
  color: #555;
  margin: 0.5rem 0;
`;

const NotifTime = styled.div`
  font-size: 0.8rem;
  color: #777;
`;
function AdminNotifications() {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-notifications"],
    queryFn: getAdminNotifications,
  });

  const queryClient = useQueryClient();

  const { mutate: clearAdminNotifications, isLoading: isClearing } =
    useMutation({
      mutationFn: clearAllAdminNotifications,
      onSuccess: () => {
        toast.success("Notifications cleared successfully");
        queryClient.invalidateQueries({
          queryKey: ["admin-notifications"],
        });
      },
      onError: () => {
        toast.error("Failed to clear notifications");
      },
    });

  function handleClearNotifications() {
    clearAdminNotifications();
  }

  if (isLoading) return <p>Loading notifications...</p>;
  if (isError) return <p>Failed to load notifications.</p>;

  return (
    <NotificationsCard>
      <NotifHeader>
        <Title>
          <HiBellAlert /> Notifications
        </Title>
        <span onClick={handleClearNotifications}>
          {" "}
          {isClearing ? "Clearing..." : "Clear"}
        </span>
      </NotifHeader>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notif) => (
          <NotifCard key={notif.id}>
            <NotifTop>
              <strong>You have a new complaint </strong>
            </NotifTop>
            <NotifText>{notif.notifications}</NotifText>
            <NotifTime>
              🕒 {new Date(notif.created_at).toLocaleString()}
            </NotifTime>
          </NotifCard>
        ))
      )}
    </NotificationsCard>
  );
}

export default AdminNotifications;
