import styled from "styled-components";
import { FiUser, FiUsers } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

const CalendarCard = styled.div`
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
const Year = styled.h3`
  color: #111;
  font-size: 1.7rem;

  word-spacing: 2px;
`;

const NavArrows = styled.div`
  span {
    font-size: 1.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
  }
`;

const Weekdays = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 0.5rem;
  font-size: 1.2rem;
  color: #707070;
`;

const Day = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 500;
  color: #666;
`;

const Dates = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const DateCircle = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.6rem;
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? "orange" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#000" : "#333")};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  transition: 0.3s;
  cursor: pointer;
`;

const TimeSlot = styled.div`
  font-size: 0.85rem;
  color: #999;
  margin: 1rem 0 0.25rem;
  border-top: 1px dashed #ddd;
  padding-top: 0.5rem;
`;

const Event = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const EventIcon = styled.div`
  background: greenyellow;
  padding: 0.75rem;
  border-radius: 12px;
  font-size: 1.25rem;
`;

const EventContent = styled.div`
  strong {
    display: block;
    margin-bottom: 0.25rem;
  }
`;

const SubText = styled.div`
  font-size: 0.8rem;
  color: #666;

  span {
    color: #456613;

    margin-left: 0.3rem;
  }
`;

function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(today));

  function getStartOfWeek(date) {
    const start = new Date(date);
    const day = start.getDay(); // 0 = Sun
    start.setDate(start.getDate() - day);
    return start;
  }

  const getWeekDays = (startDate) => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return d;
    });
  };

  const goToPreviousWeek = () => {
    const prev = new Date(startOfWeek);
    prev.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(startOfWeek);
    next.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(next);
  };

  const formatMonthYear = (date) =>
    date.toLocaleString("default", { month: "long", year: "numeric" });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDates = getWeekDays(startOfWeek);

  return (
    <>
      <CalendarCard>
        <Header>
          <Year>{formatMonthYear(startOfWeek)}</Year>
          <NavArrows>
            <span onClick={goToPreviousWeek}>‹</span>
            <span onClick={goToNextWeek}>›</span>
          </NavArrows>
        </Header>

        <Weekdays>
          {weekDates.map((date, i) => (
            <Day key={i}>{weekdays[date.getDay()]}</Day>
          ))}
        </Weekdays>

        <Dates>
          {weekDates.map((date, i) => (
            <DateCircle
              key={i}
              $isActive={date.toDateString() === selectedDate.toDateString()}
              onClick={() => setSelectedDate(date)}
            >
              {date.getDate()}
            </DateCircle>
          ))}
        </Dates>

        <TimeSlot>10:30–12:00</TimeSlot>

        <Event>
          <EventIcon>
            <FiUsers />
          </EventIcon>
          <EventContent>
            <strong>Power outage reported</strong>
            <SubText>
              12:00 - 12:30 <span>• Hostel Block B</span>
            </SubText>
          </EventContent>
        </Event>

        <TimeSlot>12:30</TimeSlot>

        <Event>
          <EventIcon>
            <FiUser />
          </EventIcon>
          <EventContent>
            <strong>Admin follow-up meeting</strong>
            <SubText>
              12:30 - 01:30 PM <span>• Complaint resolution</span>
            </SubText>
          </EventContent>
        </Event>
      </CalendarCard>
    </>
  );
}

export default Calendar;
