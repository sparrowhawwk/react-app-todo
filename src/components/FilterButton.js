function FilterButton(props) {
    return (
        <button
            type="button"
            className="px-4 py-2 font-semibold text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-sm mr-1 ml-1"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}
        >
            <span className="hidden">Show </span>
            <span>{props.name}</span>
            <span className="hidden"> tasks</span>
        </button>
    );
}

export default FilterButton;
