import { useNavigate } from "@remix-run/react";
import ExperimentForm from "~/components/common/ExperimentForm";
import { ExperimentType } from "~/constants/types";
import { useExperiments } from "~/context/experimentContext";
import useForm from "~/hooks/useForm";

export default function AddExperiment() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    gitUrl,
    setGitUrl,
    expIcon,
    setExpIcon,
    handleIconChange,
    inputRef,
    ownerName,
    setOwnerName,
    isActive,
    setIsActive
  } = useForm()
  const {addExperiment} = useExperiments()

  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    // Ensure all required fields are filled
    if (!title || !description || !gitUrl || !expIcon || !ownerName) {
      alert("Please fill in all fields before submitting.");
      return;
    }
  
    // Generate a unique ID using Date.now() for simplicity
    const newExperiment: ExperimentType = {
      id: Date.now(), // Generates a unique number based on the current timestamp
      title,
      description,
      gitUrl,
      icon: expIcon,
      ownerName: ownerName,
      isActive: isActive,
    };
  
    // Add the new experiment using the hook
    addExperiment(newExperiment);
  
    // Reset form fields after submission
    setTitle("");
    setDescription("");
    setGitUrl("");
    setExpIcon("");

    navigate("/")
  };

  
  

  return (
    <ExperimentForm 
      submitHandler={handleSubmit}
      title ={title}
      setTitle ={setTitle}
      description ={description}
      setDescription ={setDescription}
      gitUrl ={gitUrl}
      setGitUrl ={setGitUrl}
      expIcon ={expIcon}
      handleIconChange ={handleIconChange}
      inputRef ={inputRef}
      ownerName={ownerName}
      setOwnerName={setOwnerName}
      isActive={isActive}
      setIsActive={setIsActive}
    />
  );
}
