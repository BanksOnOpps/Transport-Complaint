import { getReport } from "../../services/apiReport";
import { useQuery } from "@tanstack/react-query";
import useUser from "../authentication/useUser";

function useFeedback(statusFilter = "all") {
  const { role } = useUser();
  const {
    isLoading,
    data: complaints,
    error,
  } = useQuery({
    queryKey: ["complaints", role, statusFilter], //delete role and StatusFilter
    queryFn: () => getReport(role, statusFilter), //delete Status Filter
    enabled: !!role, // wait for role to be available
  });
  return { isLoading, error, complaints };
}

export default useFeedback;
