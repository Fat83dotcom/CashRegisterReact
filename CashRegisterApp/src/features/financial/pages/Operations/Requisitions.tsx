import { useNavigate } from "react-router-dom";
import { CreateRequisitionForm } from "../../components/CreateRequisitionForm";

export function RequisitionsPage() {
  const navigate = useNavigate();

  return (
    <CreateRequisitionForm 
      onSuccess={() => navigate("/financial")} 
    />
  );
}
