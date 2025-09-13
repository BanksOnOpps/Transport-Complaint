import styled from "styled-components";

import AdminCalendar from "../ui/AdminCalendar";
import AdminLatestFeed from "../ui/AdminLatestFeed";
import AdminNotifications from "../ui/AdminNotifications";
import AdminCharts from "../ui/AdminCharts";

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 4fr 2.5fr;
  gap: 20px;
  height: 100vh;
  /* background: linear-gradient(135deg, #2f2a89, #2dd4bf); */
  border-radius: 10px;
  overflow-y: scroll;
`;

const WelcomeText = styled.h2`
  color: #111;
  font-size: 2.7rem;
  max-width: 500px;
  line-height: 1.4;
  word-spacing: 2px;

  span {
    background: var(--color-admin-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 3.2rem;
  }
`;

const DashOne = styled.div`
  padding: 2rem;
  border-radius: 10px;
  /* background-color: purple; */
  grid-column: span 2;
`;
const DashTwo = styled.div`
  /* background-color: orange; */
  padding: 30px;
  border-radius: 10px;
`;
const DashThree = styled.div`
  border-radius: 10px;
`;
const DashFour = styled.div`
  border-radius: 10px;
`;
const DashFive = styled.div`
  border-radius: 10px;
`;

const Tagline = styled.p`
  margin-top: 0.5rem;
  color: #707070;
`;

function AdminDashboard() {
  return (
    <DashboardSection>
      <DashOne>
        <WelcomeText>
          Hello, Admin! <br />
          Talk is <span>cheap</span>. Let’s fix things. <br />
        </WelcomeText>
        <Tagline>You're the voice of order.</Tagline>
      </DashOne>
      <DashTwo>
        <AdminCharts />
      </DashTwo>
      <DashThree>
        <AdminCalendar />
      </DashThree>
      <DashFour>
        <AdminLatestFeed />
      </DashFour>
      <DashFive>
        <AdminNotifications />
      </DashFive>
    </DashboardSection>
  );
}

export default AdminDashboard;
