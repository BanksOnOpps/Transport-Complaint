import styled from "styled-components";

import Calendar from "../ui/Calendar";
import LatestFeed from "../ui/LatestFeed";
import Notifications from "../ui/Notifications";
import StudentCharts from "../ui/StudentCharts";

const DashboardSection = styled.section`
  display: grid;
  grid-template-columns: 4fr 2.5fr;
  gap: 20px;

  border-radius: 10px;
  height: 100vh;
  overflow-y: scroll;
`;

const WelcomeText = styled.h2`
  color: #111;
  font-size: 2.7rem;
  max-width: 400px;
  line-height: 1.4;
  word-spacing: 2px;

  span {
    background: linear-gradient(135deg, #2f2a89, #2dd4bf);
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
  background-color: #f5faeb;
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

function Dashboard() {
  return (
    <DashboardSection>
      <DashOne>
        <WelcomeText>
          Hi, Wisdom! <br />
          What do you want <br />
          to <span>report</span> today?
        </WelcomeText>
        <Tagline>Your voice matters. Let it be heard.</Tagline>
      </DashOne>
      <DashTwo>
        <StudentCharts />
      </DashTwo>
      <DashThree>
        <Calendar />
      </DashThree>
      <DashFour>
        <LatestFeed />
      </DashFour>
      <DashFive>
        <Notifications />
      </DashFive>
    </DashboardSection>
  );
}

export default Dashboard;
