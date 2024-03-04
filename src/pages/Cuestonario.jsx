import React, { useState } from "react";
import { useGetQuestionsQuery } from "../slices/cuestonarioApiSlice";
import { useGetAllUsersQuery } from "../slices/usersApiSlice";
import {
  useCreateResultsMutation,
  useCalculateResultsMutation,
} from "../slices/resultsApiSlice";
import { toast } from "sonner";

const Cuestonario = () => {
  const [answers, setAnswers] = useState([]);
  const [userId, setUserId] = useState(null);

  const { data, isLoading } = useGetQuestionsQuery();
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const [createResult, { isLoading: createResultLoading, error }] =
    useCreateResultsMutation();
  const [calculateResults] = useCalculateResultsMutation();

  const handleAnswerChange = (index, e) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      question: data[index].question,
      answer: e.target.value,
    };
    setAnswers(newAnswers);
  };

  const handleCreateResult = async () => {
    try {
      const res = await createResult({ user_id: userId, answers }).unwrap();
      toast.success("Cuestonario creado");
    } catch (error) {
      alert(error);
    }
  };
  const handleCalculate = async (id) => {
    try {
      await calculateResults(id).unwrap();
      toast.success("Resultados calculados");
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading || isLoadingUsers) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div className="max-w-[90%] mx-auto">
      <div className="w-[50%] mx-auto mt-10 flex items-center justify-center px-10 py-10 shadow-lg">
        <div className="w-[80%]">
          <div className="w-full">
            <select
              className="w-full border px-2 py-2 rounded"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            >
              <option value="id">Selecciona un miembro</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          {data.map((item, index) => (
            <div key={item._id} className="w-full my-4">
              <input
                type="text"
                className="border w-full px-2 py-2 my-2"
                readOnly
                value={item.question}
              />
              <select
                value={(answers[index] && answers[index].answer) || ""}
                onChange={(e) => handleAnswerChange(index, e)}
              >
                <option value="">Selecciona una opción</option>
                <option value="Yes">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
          ))}
          <div className="py-2">
            <button
              className="bg-[#333] text-white px-2 py-2 rounded"
              onClick={handleCreateResult}
            >
              Enviar
            </button>
            {/* <button
              onClick={() => handleCalculate(userId)}
              className="bg-[#124076] ml-2 text-white px-2 py-2 rounded"
            >
              Calcular resultados
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuestonario;
