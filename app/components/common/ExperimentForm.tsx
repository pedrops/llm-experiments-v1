import { ChangeEvent, RefObject } from "react";
import ExperimentIcon from "~/components/ExperimentIcon";

interface ExperimentFormInterface {
  submitHandler: (event: React.FormEvent) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  gitUrl: string;
  setGitUrl: (url: string) => void;
  expIcon: string;
  handleIconChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  ownerName: string;
  setOwnerName: (name: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export default function ExperimentForm({
  submitHandler,
  title,
  setTitle,
  description,
  setDescription,
  gitUrl,
  setGitUrl,
  expIcon,
  handleIconChange,
  inputRef,
  ownerName,
  setOwnerName,
  isActive,
  setIsActive,
}: ExperimentFormInterface) {
  // Function to handle clicking the edit button to open the file input
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Simulate click on hidden file input
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="p-4 max-w-md mx-auto rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-primary">
        Experiment Details
      </h2>

      <div className="flex grow justify-center items-center">
        <div className="w-fit h-fit relative">
          <ExperimentIcon icon={expIcon} size="xxl" />
          <div
            className="
              w-fit
              h-fit
              p-1
              bg-primary
              flex
              items-center
              justify-center
              absolute
              rounded-full
              bottom-0
              right-0
              cursor-pointer
            "
            onClick={handleClick}
          >
            <img src="/icons/edit.svg" className="w-8 h-8" alt="edit icon" />
            {/* Hidden file input */}
            <input
              hidden
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleIconChange}
            />
          </div>
        </div>
      </div>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-secondary font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter experiment title"
          className="
            w-full
            p-3
            border
            border-secondary
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            bg-transparent
          "
          required
        />
      </div>

      {/* Description Text Area */}
      <div>
        <label
          htmlFor="description"
          className="block text-secondary font-medium mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Enter experiment description"
          className="
            w-full
            p-3
            border
            border-secondary
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            bg-transparent
          "
          required
        ></textarea>
      </div>

      {/* Git URL Input */}
      <div>
        <label htmlFor="gitUrl" className="block text-secondary font-medium mb-1">
          Experiment URL
        </label>
        <input
          type="text"
          id="gitUrl"
          value={gitUrl}
          onChange={(e) => setGitUrl(e.target.value)}
          placeholder="https://github.com/your-repo"
          className="
            w-full
            p-3
            border
            border-secondary
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            bg-transparent
          "
        />
      </div>

      {/* Owner Name Input */}
      <div>
        <label
          htmlFor="ownerName"
          className="block text-secondary font-medium mb-1"
        >
          Owner Name
        </label>
        <input
          type="text"
          id="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Enter owner name"
          className="
            w-full
            p-3
            border
            border-secondary
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            bg-transparent
          "
          required
        />
      </div>

      {/* Is Active Checkbox */}
      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 text-primary border-secondary rounded"
          />
          <span className="text-secondary font-medium">Set Active</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Save Experiment
      </button>
    </form>
  );
}
