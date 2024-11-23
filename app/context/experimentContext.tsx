import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ExperimentType } from "~/constants/types";

// Initial data
const initialData: ExperimentType[] = [
  {
    'id': 300,
    'title': 'Slice of Pi',
    'description': 'Exploring snowflake data',
    'icon': '/vg001.png',
    'gitUrl': 'https://sites.google.com/inflection.ai/sliceofpi',
    'ownerName': 'Owner 300',
    'isActive': true
  },
  {
    'id': 1,
    'title': 'Periodicities',
    'description': 'Aligning to start and end of timeframes that matter. What emerges as patterns from data? What emerges from a conversation about what matters?',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 1',
    'isActive': false
  },
  {
    'id': 2,
    'title': 'Birdseye view of the company',
    'description': 'An intelligent dashboard, customized to the viewer (MoMA++, for Google alums).',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 2',
    'isActive': true
  },
  {
    'id': 3,
    'title': 'Quick archive',
    'description': 'Send anything to Pi (email forward, Slack DM, drop into Pi chat) and tell it where to go, and it puts it into a form that can be saved to that spot in Google Drive.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 3',
    'isActive': false
  },
  {
    'id': 4,
    'title': 'Off the Record mode',
    'description': 'Be able to start and end a conversation with the LLM without it remembering your inputs to recall later on, but with it still remembering who you are and your preferences.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 4',
    'isActive': true
  },
  {
    'id': 5,
    'title': 'Crowdsourcery',
    'description': 'LLM connects you with internal experts or people that otherwise have accounts of a particular role with a particular product/service.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 5',
    'isActive': false
  },
  {
    'id': 6,
    'title': "Who's in charge?",
    'description': 'LLM helps you find people with the right access control to make changes to things AND the right chain of command for requesting it.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 6',
    'isActive': true
  },
  {
    'id': 7,
    'title': 'Known unknowns',
    'description': "What areas of the business data seem to be missing? How to fill the holes of insufficient data and understand what's missing.",
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 7',
    'isActive': false
  },
  {
    'id': 8,
    'title': "Let's pretend",
    'description': 'Have the LLM give us an ongoing reminder of who they are pretending to be when they respond.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 8',
    'isActive': true
  },
  {
    'id': 9,
    'title': 'Confidence',
    'description': 'Explore which ways the LLM can indicate confidence based on reproducibility/traceable sources of responses.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 9',
    'isActive': false
  },
  {
    'id': 10,
    'title': 'The AI doesn’t know',
    'description': 'In low confidence cases, can it suggest other directions of higher confidence?',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 10',
    'isActive': true
  },
  {
    'id': 11,
    'title': 'This is fine',
    'description': 'Can it express judgment about whether an input reflects something normal (and context of what normal means), or something abnormal (and next steps to investigate)?',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 11',
    'isActive': false
  },
  {
    'id': 12,
    'title': "Who's who?",
    'description': 'Generate an ad-hoc historical org chart over time (group people by function) based on artifacts in intranet, kinda like band timelines in Wikipedia.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 12',
    'isActive': true
  },
  {
    'id': 13,
    'title': 'Latency',
    'description': "Ask Pi: 'Why is there latency?'",
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 13',
    'isActive': false
  },
  {
    'id': 14,
    'title': 'Cohorts/frequency distribution of Pi users',
    'description': 'Analyze usage patterns to understand user cohorts and frequency distribution.',
    'icon': '',
    'gitUrl': '',
    'ownerName': 'Owner 14',
    'isActive': true
  }
]

// Define Action Types
type Action =
  | { type: "FETCH_EXPERIMENTS"; payload: ExperimentType[] }
  | { type: "ADD_EXPERIMENT"; payload: ExperimentType }
  | { type: "EDIT_EXPERIMENT"; payload: { id: number; updatedData: Partial<ExperimentType> } }
  | { type: "DELETE_EXPERIMENT"; payload: number };

// Define State Type
interface State {
  experiments: ExperimentType[];
}

// Reducer Function
function experimentsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_EXPERIMENTS":
      return { experiments: action.payload };
    case "ADD_EXPERIMENT":
      return { experiments: [...state.experiments, action.payload] };
    case "EDIT_EXPERIMENT":
      return {
        experiments: state.experiments.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.updatedData } : exp
        )
      };
    case "DELETE_EXPERIMENT":
      return { experiments: state.experiments.filter((exp) => exp.id !== action.payload) };
    default:
      return state;
  }
}

// Context and Provider
const ExperimentsContext = createContext<{
  experiments: ExperimentType[];
  getExperiment: (id: number) => ExperimentType | undefined;
  addExperiment: (experiment: ExperimentType) => void;
  editExperiment: (id: number, updatedData: Partial<ExperimentType>) => void;
  deleteExperiment: (id: number) => void;
} | undefined>(undefined);

export const useExperiments = () => {
  const context = useContext(ExperimentsContext);
  if (!context) {
    throw new Error("useExperiments must be used within an ExperimentsProvider");
  }
  return context;
};

export const ExperimentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(experimentsReducer, { experiments: initialData });

  // Function to get an experiment by id
  const getExperiment = (id: number): ExperimentType | undefined => {
    return state.experiments.find((exp) => exp.id === id);
  };

  const addExperiment = (experiment: ExperimentType) => {
    dispatch({ type: "ADD_EXPERIMENT", payload: experiment });
  };

  const editExperiment = (id: number, updatedData: Partial<ExperimentType>) => {
    dispatch({ type: "EDIT_EXPERIMENT", payload: { id, updatedData } });
  };

  const deleteExperiment = (id: number) => {
    dispatch({ type: "DELETE_EXPERIMENT", payload: id });
  };

  // Fetch experiments on component mount (for initial setup)
  useEffect(() => {
    dispatch({ type: "FETCH_EXPERIMENTS", payload: initialData });
  }, []);

  return (
    <ExperimentsContext.Provider
      value={{
        experiments: state.experiments,
        getExperiment,
        addExperiment,
        editExperiment,
        deleteExperiment
      }}
    >
      {children}
    </ExperimentsContext.Provider>
  );
};
