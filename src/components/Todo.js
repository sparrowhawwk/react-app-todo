import { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);

    const [newName, setNewName] = useState('');

    const editFieldRef = useRef(null);

    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName('');
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label
                    className="todo-label block pb-2 pt-3 text-slate-600 break-all"
                    htmlFor={props.id}
                >
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="border border-slate-400 mr-2 px-3 py-2 rounded-none text-sm shadow-sm placeholder-slate-400 w-full focus:outline-none focus-visible:outline-none"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="flex flex-row space-x-4">
                <button
                    type="button"
                    className="mb-3 mt-2 basis-1/2 border bg-gray-400 hover:bg-gray-500 shadow-sm text-white px-2 py-1 font-normal rounded-none"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="hidden">renaming {props.name}</span>
                </button>
                <button
                    type="submit"
                    className="mb-3 mt-2 basis-1/2 border bg-green-400 hover:bg-green-500 shadow-sm text-white px-2 py-1 font-normal rounded-none"
                >
                    Save
                    <span className="hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small mt-2 mb-3">
            <div className="c-cb mb-1">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                    className="px-2 py-1 p-2 mr-2 border border-slate-300"
                />
                <label className="todo-label break-all" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="flex flex-row space-x-4">
                <button
                    type="button"
                    className="basis-1/2 border bg-purple-400 hover:bg-purple-500 shadow-sm text-white px-2 py-1 font-medium rounded-none"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="basis-1/2 border bg-red-400 hover:bg-red-500 shadow-sm text-white px-2 py-1 font-medium rounded-none"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}
