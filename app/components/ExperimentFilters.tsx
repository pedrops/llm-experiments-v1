import { Dispatch, SetStateAction } from 'react';

interface ExperimentFiltersProps {
  filterName: string,
  setFilterName: Dispatch<SetStateAction<string>>,
  seeActives: boolean,
  setSeeActives: Dispatch<SetStateAction<boolean>>,
  seeInactives: boolean,
  setSeeInactives: Dispatch<SetStateAction<boolean>>,
}

export default function ExperimentFilters({
  filterName,
  setFilterName,
  seeActives,
  setSeeActives,
  seeInactives,
  setSeeInactives
}:ExperimentFiltersProps) {
  return (
    <div className="mb-4 p-4 border rounded-md">
      <div className="flex flex-col items-start space-x-4">
        <label className="flex-1">
          <span className="mr-2">Filter by name:</span>
          <input
            type="text"
            className="border p-1 rounded w-full"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={seeActives}
            onChange={() => setSeeActives(!seeActives)}
          />
          <span className="ml-2">See Actives</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={seeInactives}
            onChange={() => setSeeInactives(!seeInactives)}
          />
          <span className="ml-2">See Inactives</span>
        </label>
      </div>
    </div>
  );
}