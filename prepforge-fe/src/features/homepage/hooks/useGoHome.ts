import { useNavigate } from "react-router-dom";

export default function useGoHome() {
  const navigate = useNavigate();

  return () => {
    navigate("/");
  };
}
