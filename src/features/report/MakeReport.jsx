import styled from "styled-components";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { submitReport } from "../../services/apiReport";

const StyledFormRow = styled.form`
  width: 800px;
  margin: 0 auto;
  /* background-color: var(--color-brand-400); */
  background: linear-gradient(135deg, #2f2a89, #2dd4bf);

  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  border-radius: var(--border-radius-sm);
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: ${(props) => props.$columns || "1fr"};
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-600);
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-tiny);
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
  outline: none;
  transition: all 160ms ease-in;
  &:focus {
    border-color: var(--color-brand-200);
    box-shadow: 0 0 0 1px var(--color-brand-200);
  }
`;

const Textarea = styled.textarea`
  border: 1px solid #cbd5e0;
  border-radius: var(--border-radius-tiny);
  padding: 0.5rem 1rem;
  width: 100%;
  min-height: 100px;
  outline: none;
  resize: vertical;
  transition: all 160ms ease-in;
  &:focus {
    border-color: var(--color-brand-100);
    box-shadow: 0 0 0 1px var(--color-brand-100);
  }
`;

const Select = styled.select`
  border: 1px solid #cbd5e0;
  border-radius: var(--border-radius-tiny);
  padding: 0.5rem 1rem;
  width: 100%;
  outline: none;
  &:focus {
    border-color: var(--color-brand-100);
    box-shadow: 0 0 0 1px var(--color-brand-100);
  }
`;

const ErrorMessage = styled.p`
  color: #b91c1c;
  font-size: 1rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: var(--color-student-gradient);

  color: var(--color-grey-0);
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  transition: all 160ms ease-in;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function MakeReport() {
  const { register, handleSubmit, reset, control, formState } = useForm();
  const selectedType = useWatch({ control, name: "complaintType" });
  const queryClient = useQueryClient();
  const { errors } = formState;

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      toast.success("Complaint successfully submitted");
      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (data) => {
    const complaintType =
      data.complaintType === "other" ? data.otherType : data.complaintType;

    mutate({
      ...data,
      complaintType,
      status: "pending",
    });
  };

  return (
    <StyledFormRow onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <SectionTitle>1. Complaint Details</SectionTitle>
        <Grid $columns="1fr 1fr">
          <FieldWrapper>
            <Input
              type="date"
              {...register("date", { required: "This field is required" })}
              placeholder="Date of Incident"
            />

            {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
          </FieldWrapper>
          <FieldWrapper>
            <Input
              type="time"
              {...register("time", {
                required: "This field is required",
              })}
              placeholder="Time of Incident (e.g., Morning)"
            />
            {errors.time && <ErrorMessage>{errors.time.message}</ErrorMessage>}
          </FieldWrapper>
        </Grid>
        <Grid $columns="1fr">
          <FieldWrapper>
            <Input
              type="text"
              {...register("location", { required: "This field is required" })}
              placeholder="Location (e.g., School Gate)"
            />
            {errors.location && (
              <ErrorMessage>{errors.location.message}</ErrorMessage>
            )}
          </FieldWrapper>
          <FieldWrapper>
            <Input
              type="text"
              {...register("driverId", { required: "This field is required" })}
              placeholder="Tricycle Driver Name/ID"
            />
            {errors.location && (
              <ErrorMessage>{errors.driverId.message}</ErrorMessage>
            )}
          </FieldWrapper>
          <FieldWrapper>
            <Input
              type="text"
              {...register("plateNo")}
              placeholder="Vehicle Plate Number (e.g., LAFIA 56KJB) (Optional)"
            />
            {errors.plateNo && (
              <ErrorMessage>{errors.plateNo.message}</ErrorMessage>
            )}
          </FieldWrapper>
        </Grid>

        <SectionTitle>2. Complaint Type</SectionTitle>
        <Grid $columns="1fr">
          <FieldWrapper>
            <Select
              {...register("complaintType", {
                required: "This field is required",
              })}
            >
              <option value="">Select Complaint Type</option>
              <option value="late">Late bus arrival</option>
              <option value="overcharging">Overcharging</option>
              <option value="reckless">Reckless driving</option>
              <option value="overcrowding">Overcrowding</option>
              <option value="rude">Rude behavior</option>
              <option value="vehicle">Poor vehicle condition</option>
              <option value="safety">Safety concern</option>
              <option value="other">Other</option>
            </Select>

            {selectedType === "other" && (
              <Input
                type="text"
                {...register("otherType", {
                  required: "This field is required",
                })}
                placeholder="If 'Other', please specify..."
              />
            )}
            {errors.complaintType && (
              <ErrorMessage>{errors.complaintType.message}</ErrorMessage>
            )}
          </FieldWrapper>
        </Grid>

        <SectionTitle>3. Description of the Complaint</SectionTitle>
        <Grid $columns="1fr">
          <FieldWrapper>
            <Textarea
              {...register("description", {
                required: "This field is required",
              })}
              placeholder="Describe what happened..."
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </FieldWrapper>
        </Grid>

        <SectionTitle>4. Evidence (optional)</SectionTitle>
        <Grid $columns="1fr">
          <FieldWrapper>
            <Input type="file" disabled />
          </FieldWrapper>
        </Grid>
        <ButtonRow>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </ButtonRow>
      </Card>
    </StyledFormRow>
  );
}

export default MakeReport;
