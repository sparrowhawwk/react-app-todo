import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function App(props) {
    const [tasks, setTasks] = useState(props.tasks);

    const [filter, setFilter] = useState('All');

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map((task) => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length > 1 ? 'tasks' : 'task';

    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    function addTask(name) {
        const newTask = {
            id: 'todo-' + nanoid(),
            name: name,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
    }

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTask = tasks.filter((task) => id !== task.id);
        setTasks(remainingTask);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const listHeadingRef = useRef(null);

    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="grid justify-items-center sm:container sm:mx-auto">
            <div className="border border-slate-200 pt-2 pr-10 pl-10 pb-2 mt-10 drop-shadow-lg">
                <h1 className="text-3xl font-bold tracking-widest text-blue-600 text-center mt-5 mb-5">
                    TodoMatic
                </h1>
                <Form addTask={addTask} />
                <div className="text-center mb-5">{filterList}</div>
                <h2
                    id="list-heading"
                    tabIndex="-1"
                    ref={listHeadingRef}
                    className="tracking-wide text-slate-500 text-xl"
                >
                    {headingText}
                </h2>
                <ul
                    role="list"
                    className="todo-list stack-large stack-exception"
                    aria-labelledby="list-heading"
                >
                    {taskList}
                </ul>
            </div>
        </div>
    );
}

export default App;
