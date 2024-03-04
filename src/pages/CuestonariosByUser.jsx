import React, { useState } from "react";
import { useGetUserByIdQuery } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { CircularProgressBar } from "react-percentage-bar";
import { useGetResultsByUserQuery } from "../slices/resultsApiSlice";
import { useCalculateResultsMutation } from "../slices/resultsApiSlice";
import { toast } from "sonner";

const CuestonariosByUser = () => {
  const { id } = useParams();
  const { data: user, isLoading, refetch } = useGetUserByIdQuery(id);
  const { data: results, isLoading: resultsLoading, refetch: resultsRefetch } =
    useGetResultsByUserQuery(id);
    const [calculateResults] = useCalculateResultsMutation()

  const handleCalculate = async () => {
    try {
      await calculateResults(id)
      toast.success("Resultados calculados")
      refetch()
      resultsRefetch()
    } catch (error) {
      toast.error(error)
    }
  }

  if (isLoading || resultsLoading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className="max-w-[90%] flex items-start justify-between py-10 mx-auto ">
      <div className="text-center rounded flex items-center flex-col justify-center py-5 w-[400px] shadow-lg">
        <CircularProgressBar percentage={user.score} />
        <div>
          <h4 className="text-2xl font-bold my-3">
            {user.name} {user.lastName}
          </h4>
          <hr />
          <h5 className="mt-2">{user.userCode}</h5>
        </div>
        <button onClick={handleCalculate} className="bg-[#0ea5e9] text-white rounded px-2 py-2 my-3 hover:cursor-pointer">Calcular resultados</button>
      </div>
      <div className="w-[70%]">
        {results.map((result) => (
          <ResultItem key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
};

const ResultItem = ({ result }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        onClick={() => setToggle(!toggle)}
        className="my-2 hover:cursor-pointer hover:scale-95 ease-out duration-75 shadow-lg flex items-center justify-between py-5 px-[50px] rounded"
      >
        <div className="font-bold text-xl">
          {new Date(result.createdAt).toLocaleString()}
        </div>
        <div className="font-bold text-xl">Puntaje: {result.score}</div>
      </div>
      <div>
        {toggle &&
          result.answers.map((answer) => (
            <div
              key={answer._id}
              className={
                answer.answer === "Yes"
                  ? "border py-2 my-2 px-2 rounded border-green-500"
                  : "border py-2 my-2 px-2 rounded border-red-500"
              }
            >
              <div>
                <h5>{answer.question}</h5>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CuestonariosByUser;
