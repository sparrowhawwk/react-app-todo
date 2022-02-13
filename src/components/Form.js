import { useState } from 'react';

function Form(props) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName('');
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="text-center mb-3">
            <h2 className="text-lg text-center mb-2 tracking-wider">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="border border-slate-400 mr-2 px-3 py-2 rounded-none text-sm shadow-sm placeholder-slate-400 w-3/4 focus:outline-none focus-visible:outline-none"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="px-4 py-2 font-semibold text-sm bg-slate-500 hover:bg-slate-600 text-white rounded-none shadow-sm"
            >
                Add
            </button>
        </form>
    );
}

export default Form;
