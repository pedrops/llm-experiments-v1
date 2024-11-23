import React, { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import ExperimentCard from "~/components/ExperimentCard";
import AddExperiment from "~/components/AddExperiment";
import { useExperiments } from "~/context/experimentContext";
import ExperimentFilters from "~/components/ExperimentFilters";

export const meta: MetaFunction = () => {
  return [
    { title: "Experiments" },
    { name: "description", content: "Welcome to Experiments!" },
  ];
};

export default function Index() {
  const { experiments } = useExperiments();
  const [seeActives, setSeeActives] = useState(true);
  const [seeInactives, setSeeInactives] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [seeFilters, setSeeFilters] = useState(false);

  // Filter logic
  const filteredExperiments =
    experiments?.filter((experiment) => {
      const matchesActive =
        (seeActives && experiment.isActive) || (seeInactives && !experiment.isActive);
      const matchesName = experiment.title
        .toLowerCase()
        .includes(filterName.toLowerCase());
      return matchesActive && matchesName;
    }) ?? [];

  // UI if experiments is null or empty
  if (!experiments || experiments.length === 0) {
    return (
      <div className="text-center text-lg p-4 text-gray-700">
        <p className="font-bold">No experiments at the moment, add one!</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center m-4">
        <p className="text-2xl">Experiments:</p>
        <img
          src={seeFilters ? "/icons/no-filter.svg" : "/icons/filter.svg"}
          alt="Filter Icon"
          className="w-6 h-6 cursor-pointer text-green-primary hover:text-green-primary transition-colors"
          style={{ filter: "invert(33%) sepia(93%) saturate(400%) hue-rotate(80deg)" }}
          onClick={() => setSeeFilters(!seeFilters)}
        />
      </div>

      {/* Filter UI */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          seeFilters ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <ExperimentFilters
          filterName={filterName}
          setFilterName={setFilterName}
          seeActives={seeActives}
          setSeeActives={setSeeActives}
          seeInactives={seeInactives}
          setSeeInactives={setSeeInactives}
        />
      </div>

      {/* Display experiments or fallback */}
      {filteredExperiments.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-4">
          <img src="/Ghost.png" alt="No Experiments Found" />
          <p>{"No Experiment matches this requirements"}</p>
          <p>{":("}</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
          {filteredExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} {...experiment} />
          ))}
        </div>
      )}

      <AddExperiment />
    </div>
  );
}
