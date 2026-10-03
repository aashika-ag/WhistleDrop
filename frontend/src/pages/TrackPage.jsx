import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";

function TrackPage() {
    const [searchParams] = useSearchParams();

    const [caseCode, setCaseCode] = useState(
        searchParams.get("caseCode") || ""
    );

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedCode = caseCode.trim();

        if (!trimmedCode) {
            setError("Please enter your case code.");
            setReport(null);
            return;
        }

        setLoading(true);
        setError("");
        setReport(null);

        try {
            const response = await api.get(
                `/api/reports/track/${encodeURIComponent(trimmedCode)}`
            );

            setReport(response.data);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "No report was found for this case code.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        if (!status) {
            return "status-badge";
        }

        const normalizedStatus = String(status)
            .toLowerCase()
            .replace("_", "-");

        return `status-badge status-${normalizedStatus}`;
    };

    const getStatusText = (status) => {
        if (!status) {
            return "Unknown";
        }

        return String(status).replace("_", " ");
    };

    return (
        <main className="page-container">
            <section className="form-card track-card">
                <div className="form-heading">
                    <p className="eyebrow">
                        Anonymous tracking
                    </p>

                    <h1>Track your report</h1>

                    <p className="form-help">
                        Enter the case code you received after
                        submitting your report.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="caseCode">
                            Case code
                        </label>

                        <input
                            id="caseCode"
                            type="text"
                            value={caseCode}
                            onChange={(event) =>
                                setCaseCode(
                                    event.target.value.toUpperCase()
                                )
                            }
                            placeholder="e.g. A7K92PX4M1QZ"
                            maxLength="32"
                            autoComplete="off"
                            required
                        />
                    </div>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="primary-button submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Checking..."
                            : "Check status"}
                    </button>
                </form>

                {report && (
                    <div className="track-result">
                        <div className="track-result-header">
                            <div>
                                <p className="eyebrow">
                                    Report found
                                </p>

                                <h2>
                                    Case #{report.caseCode}
                                </h2>
                            </div>

                            <span
                                className={getStatusClass(
                                    report.status
                                )}
                            >
                                {getStatusText(
                                    report.status
                                )}
                            </span>
                        </div>

                        <div className="report-details">
                            <div className="detail-item">
                                <span>Category</span>

                                <strong>
                                    {report.category}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Submitted</span>

                                <strong>
                                    {report.createdAt
                                        ? new Date(
                                              report.createdAt
                                          ).toLocaleString()
                                        : "—"}
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Last updated</span>

                                <strong>
                                    {report.updatedAt
                                        ? new Date(
                                              report.updatedAt
                                          ).toLocaleString()
                                        : "—"}
                                </strong>
                            </div>
                        </div>

                        <div className="status-timeline">
                            <div
                                className={`timeline-step ${
                                    report.status
                                        ? "completed"
                                        : ""
                                }`}
                            >
                                <span>1</span>

                                <div>
                                    <strong>
                                        Submitted
                                    </strong>

                                    <small>
                                        Report received
                                    </small>
                                </div>
                            </div>

                            <div
                                className={`timeline-line ${
                                    [
                                        "UNDER_REVIEW",
                                        "RESOLVED",
                                        "DISMISSED"
                                    ].includes(report.status)
                                        ? "active"
                                        : ""
                                }`}
                            />

                            <div
                                className={`timeline-step ${
                                    [
                                        "UNDER_REVIEW",
                                        "RESOLVED",
                                        "DISMISSED"
                                    ].includes(report.status)
                                        ? "completed"
                                        : ""
                                }`}
                            >
                                <span>2</span>

                                <div>
                                    <strong>
                                        Under review
                                    </strong>

                                    <small>
                                        Being assessed
                                    </small>
                                </div>
                            </div>

                            <div
                                className={`timeline-line ${
                                    [
                                        "RESOLVED",
                                        "DISMISSED"
                                    ].includes(report.status)
                                        ? "active"
                                        : ""
                                }`}
                            />

                            <div
                                className={`timeline-step ${
                                    [
                                        "RESOLVED",
                                        "DISMISSED"
                                    ].includes(report.status)
                                        ? "completed"
                                        : ""
                                }`}
                            >
                                <span>3</span>

                                <div>
                                    <strong>
                                        {report.status ===
                                        "DISMISSED"
                                            ? "Dismissed"
                                            : "Resolved"}
                                    </strong>

                                    <small>
                                        Final status
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

export default TrackPage;