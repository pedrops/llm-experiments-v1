import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { ExperimentType } from "~/constants/types";
import ExperimentIcon from "~/components/ExperimentIcon";
import { useExperiments } from "~/context/experimentContext";

export default function ConfidenceExperiment() {
  const { getExperiment } = useExperiments();
  const params = useParams();
  const navigate = useNavigate()

  const [experiment, setExperiment] = useState<ExperimentType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const ownerName = `(${experiment? experiment.ownerName : "unknown"})`

  const handleEditMode = () => {
    navigate(`/experiment/edit/${params.id}`)
  }

  // Fetch experiment data using the context's getExperiment function
  useEffect(() => {
    if (params.id) {
      const experimentData = getExperiment(Number(params.id));
      if (experimentData) {
        setExperiment(experimentData);
        setImageUrl(experimentData.icon);
      }
    }
  }, [params.id, getExperiment]);

  const handleLaunch = () => {
    if (experiment?.gitUrl) {
      // Open the Git URL in a new tab
      window.open(experiment.gitUrl, "_blank");
    } else {
      alert("No Git URL provided for this experiment.");
    }
  };
  

  if (!experiment) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{experiment.title}</h1>
      <h2 className="mb-6">{ownerName}</h2>
      <div style={styles.iconContainer}>
        <ExperimentIcon icon={imageUrl} size="xxl" />
      </div>
      <p style={styles.description}>{experiment.description}</p>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Experiment Confidence Level</h2>
        <div style={styles.confidenceBar}>
          <div
            style={{
              ...styles.confidenceFill,
              width: `${Math.floor(Math.random() * 100)}%`,
            }}
          ></div>
        </div>
      </div>

      <button style={styles.launchButton} onClick={handleLaunch}>
        Launch Experiment
      </button>

      {/* File Upload Button */}
      <span style={styles.uploadButton} onClick={handleEditMode}>
        Edit Experiment
      </span>
    </div>
  );
}

// Inline styles as a const object
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center" as const,
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold" as const,
  },
  description: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#555",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold" as const,
    marginBottom: "10px",
  },
  confidenceBar: {
    width: "100%",
    height: "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    overflow: "hidden" as const,
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.5s ease-in-out",
  },
  launchButton: {
    display: "block",
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "20px",
    marginBottom: "20px",
    transition: "background-color 0.3s ease",
  },
  uploadButton: {
    display: "inline-block",
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
};
