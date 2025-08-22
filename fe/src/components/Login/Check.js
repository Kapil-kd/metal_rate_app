import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifylogin } from "../../api/authService";
import Loading from "../Loading/Loading";

export const Check = ({ element: Element }) => {
  const [route, setRoute] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.token;
    const verify = async () => {
      try {

        const res = await verifylogin(token);

        if (res?.data?.msg === "success" && res?.data?.code === 200) {
          setRoute(true);
        } else {
          setRoute(false);
        }
      } catch (err) {
        setRoute(false);
      }
    };

    verify();
  }, []);

  if (route === null) {
    return <Loading/>;
  }

  if (route) {
    if (route) return <Element />;
  } else {
    localStorage.removeItem("token");
    return navigate("/login");
  }
};
