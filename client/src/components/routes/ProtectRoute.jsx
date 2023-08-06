import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectRoute = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/");

    return () => clearInterval(interval);
  }, [count]);

  return <div>No Permission, redirect in {count}</div>;
};

export default ProtectRoute;
