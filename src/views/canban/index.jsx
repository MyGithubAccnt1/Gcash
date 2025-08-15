import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CanbanSection from "./components/canbanSection";
import CanbanTask from "./components/canbanTask";
import AddTaskForm from "./components/addTaskForm";
import axios from "axios";
import { GS_KANBAN_URL } from "../../utils/constant";

export default function Index() {
  const formHandler = AddTaskForm();
  const board = useRef(null);
  const todoRef = useRef(null);
  const inProgressRef = useRef(null);
  const doneRef = useRef(null);
  const futureRef = useRef(null);

  const parentRef = useRef(null);

  const [isFirstRender, setFirstRender] = useState(true);

  const [boardSections] = useState([
    todoRef,
    inProgressRef,
    doneRef,
    futureRef,
  ]);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    localStorage.setItem("kanbanboard", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("kanbanboard")) ?? []);
  }, []);

  const positionHandler = ({ x, y, id }) => {
    for (let index = 0; index < boardSections.length; index++) {
      const section = boardSections[index];

      const start = x >= section.current.getBoundingClientRect().left;
      const end = x <= section.current.getBoundingClientRect().right;

      const top = y >= section.current.getBoundingClientRect().top;
      const bottom = y <= section.current.getBoundingClientRect().bottom;

      console.log("called");

      if (start && end && top && bottom) {
        setTodos((prev) => {
          return prev.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                type: getKey(index + 1),
                priority: y,
                history: [
                  ...todo.history,
                  {
                    type: getKey(index + 1),
                    createdAt: new Date().toString(),
                  },
                ],
              };
            }
            return todo;
          });
        });

        break;
      }
    }
  };

  const getKey = (key) => {
    switch (key) {
      case 1:
        return "todo";
      case 2:
        return "progress";
      case 3:
        return "done";
      case 4:
        return "future";
    }
    throw new Error("Invalid key ");
  };

  const createTask = ({ title, content }) => {
    return {
      id: uuidv4(),
      title: title,
      content: content,
      spawn: 1,
      type: "future",
      priority: 1,
      history: [],
      assign: [],
      createdAt: new Date().toString(),
      startedAt: null,
    };
  };

  const handleDeletion = async (id) => {
    withReactContent(Swal)
      .fire({
        html: (
          <i className="text-sm">Are you sure you want to delete this task?</i>
        ),
        confirmButtonText: "Delete",
        showCancelButton: true,
        width: "300px",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "btn  !px-3 !py-1 rounded shadow cursor-pointer !mr-2 text-sm bg-red-500 text-white",
          cancelButton:
            "btn  !px-3 !py-1 rounded shadow cursor-pointer text-sm bg-indigo-500 text-white",
        },
      })
      .then((res) => {
        if (res.isConfirmed) {
          setTodos((prev) => {
            return prev.filter((todo) => todo.id !== id);
          });
        }
      });
  };

  const showAddFormModal = () => {
    withReactContent(Swal)
      .fire({
        backdrop: false,
        html: formHandler.form(),
        title: "New Task",
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        buttonsStyling: false,
        preConfirm: () => {
          const { title, content } = formHandler.values();

          const isValid = title && content;

          if (!isValid) {
            Swal.showValidationMessage(`
            ${title ? "" : "Title is required"}
            ${content ? "" : "Content is required"}
            `);
          }

          return isValid;
        },
        customClass: {
          confirmButton:
            "btn  !px-3 !py-2 rounded shadow cursor-pointer !mr-2 text-md bg-indigo-500 text-white",
          cancelButton:
            "btn  !px-3 !py-2 rounded shadow cursor-pointer text-md bg-gray-500 text-white",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          addTask({ ...formHandler.values() });
        }
      });
  };

  const getTodosByType = ({ todos, positionHandler, handleDeletion, type }) => {
    return (
      <>
        {todos?.length &&
          todos
            .filter((todo) => todo.type === type)
            .sort((x, y) => x.priority - y.priority)
            .map((todo) => {
              return (
                <CanbanTask
                  key={todo.id}
                  id={todo.id}
                  defaultSpawn={todo.spawn}
                  bound="#board"
                  title={todo.title}
                  content={todo.content}
                  positionHandler={positionHandler}
                  handleDeletion={handleDeletion}
                  type={todo.type}
                  assign={todo.assign?.[todo.assign.length - 1]}
                  parentRef={board}
                />
              );
            })}
      </>
    );
  };

  const addTask = async ({ title, content }) => {
    const task = createTask({ title: title, content: content });

    setTodos((prev) => {
      return [...prev, task];
    });

    try {
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(task));

      const response = await axios.post(GS_KANBAN_URL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
  };

  console.log("todos: ", todos);

  return (
    <>
      <div className="!p-3 w-full z-4">
        <section className="flex !p-2">
          <button
            className="flex items-center gap-1 bg-blue-600 px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => showAddFormModal()}
          >
            Add Todo
          </button>
        </section>

        <section
          className="w-full h-[800px] grid grid-cols-3 grid-rows-5 !relative gap-2 !p-2"
          id="board"
          ref={board}
        >
          <CanbanSection
            title="Future"
            style="row-span-2 col-span-3"
            ref={futureRef}
          >
            <div className="grid grid-cols-4 gap-2 !px-2`">
              {getTodosByType({
                type: "future",
                todos: todos,
                positionHandler: positionHandler,
                handleDeletion: handleDeletion,
              })}
            </div>
          </CanbanSection>

          <CanbanSection title="Todo" style="row-span-2" ref={todoRef}>
            <div className="grid grid-cols-1 gap-2 !px-2`">
              {getTodosByType({
                type: "todo",
                todos: todos,
                positionHandler: positionHandler,
                handleDeletion: handleDeletion,
              })}
            </div>
          </CanbanSection>
          <CanbanSection
            title="In Progress"
            style="row-span-2"
            ref={inProgressRef}
          >
            <div className="grid grid-cols-1 gap-2 !px-2`">
              {getTodosByType({
                type: "progress",
                todos: todos,
                positionHandler: positionHandler,
                handleDeletion: handleDeletion,
              })}
            </div>
          </CanbanSection>

          <CanbanSection title="Done" style="row-span-2" ref={doneRef}>
            <div className="grid grid-cols-1 gap-2 !px-2`">
              {getTodosByType({
                type: "done",
                todos: todos,
                positionHandler: positionHandler,
                handleDeletion: handleDeletion,
              })}
            </div>
          </CanbanSection>
        </section>
      </div>
    </>
  );
}
