import React from "react";
import { useGetAllUsersQuery } from "../slices/usersApiSlice";
import ProgressCirle from "../components/ProgressCirle";
import { CircularProgressBar } from "react-percentage-bar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <h2>Cargando...</h2>;
  }
  return (
    <main className="max-w-[90%] py-10 mx-auto ">
      <div className="flex items-center justify-start gap-5">
        {data.map((user) => (
          <div
            key={user._id}
            onClick={() => navigate(`/cuestonarios/${user._id}`)}
            className="hover:cursor-pointer shadow-lg px-5 rounded py-5 max-w-[200px] text-center"
          >
            <div>
              <CircularProgressBar percentage={user.score} />
              <h3 className="my-2">{user.userCode}</h3>
              <hr />
            </div>
            <div className="py-1">
              <h4 className="font-bold">
                {user.name} {user.lastName}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
