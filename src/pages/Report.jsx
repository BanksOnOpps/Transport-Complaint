import MakeReport from "../features/report/MakeReport";
import Row from "../ui/Row";

function Report() {
  return (
    <>
      {/* <Row type="horizontal">
        <Heading as="h1">Complaint</Heading>
      </Row> */}

      <Row>
        <MakeReport />
      </Row>
    </>
  );
}

export default Report;
