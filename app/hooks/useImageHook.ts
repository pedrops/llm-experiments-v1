import { useState } from "react";

export default function useImageHook() {
  const [expIcon, setExpIcon] = useState<string>("/icons/default-exp.png");

  // Function to handle the file input change event
  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setExpIcon(blobUrl);
    }
  };

  return { expIcon, setExpIcon, handleIconChange };
}
