import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReport as deleteReportApi } from "../../services/apiReport";
import useUser from "../authentication/useUser";

export function useDeleteReport() {
  const queryClient = useQueryClient();
  const { role } = useUser();

  const { isLoading: isDeleting, mutate: deleteReport } = useMutation({
    mutationFn: (id) => deleteReportApi(id, role), // pass role here
    onSuccess: () => {
      toast.success("Complaint successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteReport };
}
