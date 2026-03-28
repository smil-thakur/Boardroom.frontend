import { useMutation } from "@tanstack/react-query";
import { API_handler } from "./common/API_handler";
import { HEALTH_CHECK } from "./constants/APIContants";

const App = () => {
  const checHealth = async () => {
    return await API_handler("get", HEALTH_CHECK);
  };

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn: checHealth,
  });
  return (
    <div>
      {isPending && <div>pending healthcheck...</div>}
      {isError && <div>Can not connect with the backend {error.message}</div>}
      {data && <div>health check successfull {data.data.server}</div>}
      <button onClick={() => mutate()}>check health</button>
    </div>
  );
};

export default App;
