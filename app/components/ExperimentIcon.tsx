import { useEffect } from "react";
import useImageHook from "~/hooks/useImageHook";

interface IconProps {
  icon: string | null;
  size?: "xs" | "sm" | "md" | "xl" | "xxl";
}

export default function ExperimentIcon({ icon, size = "sm" }: IconProps) {
  const { expIcon, setExpIcon } = useImageHook();

  useEffect(() => {
    if (icon && icon.length > 0) {
      setExpIcon(icon);
    }
  }, [icon]);

  // Define size classes based on the size prop
  const sizeClasses = {
    xs: "w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12", // 48px
    sm: "w-20 h-20 min-w-20 min-h-20 max-w-20 max-h-20", // 64px (default)
    md: "w-28 h-28 min-w-28 min-h-28 max-w-28 max-h-28", // 96px
    xl: "w-36 h-36 min-w-36 min-h-36 max-w-36 max-h-36", // 128px
    xxl: "w-44 h-44 min-w-44 min-h-44 max-w-44 max-h-44", // 160px
  };

  return (
    <div className="w-fit h-fit relative">
      {/* Icon Display */}
      <div
        className={`
          relative
          flex
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-gray-200
          ${sizeClasses[size]}
        `}
      >
        <img
          src={expIcon}
          alt="experiment icon"
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
    </div>
  );
}
