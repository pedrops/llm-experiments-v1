import { useState, useRef, ChangeEvent } from "react";
import useImageHook from "~/hooks/useImageHook";

export default function useExperimentForm() {
  // State for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [isActive, setIsActive] = useState(true)
  const [ownerName, setOwnerName] = useState("")

  // State and handlers for the experiment icon
  const { expIcon, setExpIcon, handleIconChange } = useImageHook();

  // Reference to the hidden file input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Function to handle clicking the edit button to open the file input
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    gitUrl,
    setGitUrl,
    expIcon,
    setExpIcon,
    handleIconChange,
    handleClick,
    inputRef,
    ownerName,
    setOwnerName,
    isActive,
    setIsActive
  };
}
