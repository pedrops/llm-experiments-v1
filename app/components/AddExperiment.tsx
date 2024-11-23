import { useNavigate } from "@remix-run/react";

export default function AddExperiment() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/experiment/new")
  }

  return (
    <div
    onClick={handleClick}
      className="
        fixed
        bottom-4
        right-4
        w-16
        h-16
        flex
        justify-center
        items-center
        bg-primary
        rounded-full
        shadow-lg
        cursor-pointer
        transition
        duration-300
      "
    >
      <img
        className="w-8 h-8"
        src="/icons/add-exp.svg"
        alt="Add experiment icon"
      />
    </div>
  );
}
