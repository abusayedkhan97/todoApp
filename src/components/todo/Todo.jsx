import { useDispatch, useSelector } from "react-redux";
import "./todo.css";
import { MdDelete } from "react-icons/md";
import { createNewTodo, deleteTodo, statusChange } from "../../app/features/todo/todoSlice";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
const Todo = () => {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  // todo modal
  const [modal, setModal] = useState(false);

  // input change
  const [input, setInput] = useState({
    todo: "",
    status: "",
  });

  // handle change input
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewTodo(input));
    setModal(false);
  };

  // Function to determine background color based on status
  const getBackgroundColor = (status) => {
    switch (status) {
      case "Done":
        return "#0080006b";
      case "Processing":
        return "#ffff0054";
      case "Pending":
        return "#0000ff3d";
    }
  };

  return (
    <>
      <div className="container mx-auto font-bold mt-12">
        <h1 className="text-center text-3xl">All todo</h1>
        <hr />

        <button
          className="bg-black text-white px-6 py-2 uppercase"
          onClick={() => setModal(true)}
        >
          Create new todo
        </button>

        <div className="allTodo mt-2">
          {todo.todo.map((item) => {
            return (
              <div
                key={item.id}
                className="border border-gray-300 mb-1 p-2 flex justify-between w-3/4 m-auto items-center"
                style={{backgroundColor: getBackgroundColor(item.status)}}
              >
                <h1>{item.todo}</h1>
                {/* all action */}
                <div className="action">

                  {item.status != "Processing" && (
                    <button className="focus:outline-none bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 dark:focus:ring-yellow-900 mb-0" onClick={()=>dispatch(statusChange({id:item.id, status: "Processing"}))}>Processing</button>
                  )}

                  {item.status != "Pending" && (
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-0" onClick={()=>dispatch(statusChange({id:item.id, status: "Pending"}))}>Pending</button>
                  )}

                  {item.status != "Done" && (
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>dispatch(statusChange({id:item.id, status: "Done"}))}>Done</button>
                  )}


                  <button onClick={() => dispatch(deleteTodo(item.id))}>
                    <MdDelete className="text-4xl text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* todo modal */}
      {modal && (
        <div className="todoModal">
          <div className="todoModalBody">
            <button className="close" onClick={() => setModal(false)}>
              <IoClose />
            </button>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="todo"
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
                onChange={(e) => handleInput(e)}
              />

              <select
                name="status"
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-3"
                onChange={(e) => handleInput(e)}
              >
                <option>-Select-</option>
                <option value="Pending">Pending</option>
                <option value="Procesing">Procesing</option>
                <option value="Done">Done</option>
              </select>

              <input
                type="submit"
                className="bg-black text-white font-bold uppercase w-full mt-3 p-2 rounded hover:bg-slate-900 cursor-pointer"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
