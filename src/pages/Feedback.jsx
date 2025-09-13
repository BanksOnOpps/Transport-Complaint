import { useState } from "react";
import CheckFeedback from "../features/feedback/CheckFeedback";
import FeedbackTable from "../features/feedback/FeedbackTable";
import useFeedback from "../features/feedback/useFeedback";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Filter from "../ui/Filter";

function Feedback() {
  const [filterStatus, setFilterStatus] = useState();
  const { isLoading, complaints } = useFeedback(filterStatus);

  function handleFilterChange(e) {
    setFilterStatus(e.target.value);
  }
  return (
    <>
      <Row>
        <CheckFeedback />
        <Heading as="h2">Report history</Heading>
        <Filter
          handleFilterChange={handleFilterChange}
          filterStatus={filterStatus}
        />
        <FeedbackTable isLoading={isLoading} complaints={complaints} />
      </Row>
    </>
  );
}

export default Feedback;
