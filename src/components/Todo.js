import { useState } from 'react';

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);

    const [newName, setNewName] = useState('');

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
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                />
            </div>
            <div className="customBtn">
                <button
                    type="button"
                    className="btn todo-cancel btn-outline-dark me-2"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">
                        renaming {props.name}
                    </span>
                </button>
                <button type="submit" className="btn btn-outline-dark todo-edit">
                    Save
                    <span className="visually-hidden">
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small row">
            <div className="c-cb col-md-9 col-sm-12">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="col-md-3 col-sm-12 text-md-end">
                <button
                    type="button"
                    className="btn btn-dark me-2"
                    onClick={() => setEditing(true)}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
}
