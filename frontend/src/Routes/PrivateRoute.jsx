import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Text, useToast } from "@chakra-ui/react";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth, authLoading } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
  }, [isAuth, navigate]);

  return children;
}

export default PrivateRoute;
