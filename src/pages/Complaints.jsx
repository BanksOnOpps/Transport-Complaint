import ComplaintTable from "../features/feedback/ComplaintTable";
import FeedbackTable from "../features/feedback/FeedbackTable";
import Row from "../ui/Row";

function Complaints() {
  return (
    <>
      {/* <Row type="horizontal">
        <Heading as="h1">Complaint</Heading>
      </Row> */}

      <Row>
        {/* <FeedbackTable /> */}
        <ComplaintTable />
      </Row>
    </>
  );
}

export default Complaints;
