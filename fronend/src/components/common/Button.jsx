function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#F4B643]
        hover:bg-[#E79E32]
        text-white
        px-4
        py-2
        rounded-lg
        transition
      "
    >
      {children}
    </button>
  );
}

export default Button;