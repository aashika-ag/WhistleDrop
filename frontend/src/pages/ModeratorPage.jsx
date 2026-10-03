import { useEffect, useRef, useState } from "react";
import api from "../api/api";

function ModeratorPage() {
    const [reports, setReports] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [statusMenuOpen, setStatusMenuOpen] = useState(false);
    const statusMenuRef = useRef(null);

    const statusOptions = [
        { value: "ALL", label: "All reports" },
        { value: "SUBMITTED", label: "Submitted" },
        { value: "UNDER_REVIEW", label: "Under review" },
        { value: "RESOLVED", label: "Resolved" },
        { value: "DISMISSED", label: "Dismissed" }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                statusMenuRef.current &&
                !statusMenuRef.current.contains(event.target)
            ) {
                setStatusMenuOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const getSelectedStatusLabel = () => {
        return (
            statusOptions.find(
                (option) =>
                    option.value === statusFilter
            )?.label || "All reports"
        );
    };

    const loadReports = async (auth) => {
        try {
            const response = await api.get(
                "/api/moderator/reports",
                {
                    auth,
                    timeout: 8000
                }
            );

            setReports(response.data);
            return true;
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Invalid moderator credentials.");
            } else if (err.response?.status === 403) {
                setError(
                    "You are not authorized as a moderator."
                );
            } else if (err.code === "ECONNABORTED") {
                setError(
                    "The moderator service did not respond. Make sure the backend is running."
                );
            } else {
                setError(
                    "Unable to connect to the moderator service."
                );
            }

            return false;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username.trim() || !password) {
            setError(
                "Please enter your username and password."
            );
            return;
        }

        setLoading(true);
        setError("");

        const auth = {
            username: username.trim(),
            password
        };

        try {
            const success = await loadReports(auth);

            if (success) {
                setAuthenticated(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        setError("");

        try {
            await api.patch(
                `/api/moderator/reports/${id}/status`,
                { status },
                {
                    auth: {
                        username,
                        password
                    },
                    timeout: 8000
                }
            );

            await loadReports({
                username,
                password
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to update report status."
            );
        }
    };

    const filteredReports = reports.filter((report) => {
        const matchesStatus =
            statusFilter === "ALL" ||
            report.status === statusFilter;

        const matchesCategory =
            !categoryFilter ||
            report.category
                .toLowerCase()
                .includes(categoryFilter.toLowerCase());

        return matchesStatus && matchesCategory;
    });

    if (!authenticated) {
        return (
            <main className="page-container">
                <section className="form-card moderator-login">
                    <div className="form-heading">
                        <p className="eyebrow">
                            Restricted access
                        </p>

                        <h1>Moderator login</h1>

                        <p className="form-help">
                            Authorized moderators can review and
                            manage submitted reports.
                        </p>
                    </div>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(
                                        event.target.value
                                    )
                                }
                                autoComplete="username"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="current-password"
                                disabled={loading}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="primary-button submit-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in"}
                        </button>
                    </form>
                </section>
            </main>
        );
    }

    return (
        <main className="page-container moderator-page">
            <section className="moderator-header">
                <div>
                    <p className="eyebrow">
                        Moderator workspace
                    </p>

                    <h1>Report management</h1>

                    <p className="form-help">
                        Review submitted reports and update their
                        status.
                    </p>
                </div>

                <button
                    className="secondary-button"
                    onClick={() => {
                        setAuthenticated(false);
                        setUsername("");
                        setPassword("");
                        setReports([]);
                        setError("");
                    }}
                >
                    Sign out
                </button>
            </section>

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            <section className="moderator-filters">
                <div
                    className="filter-group custom-select-group"
                    ref={statusMenuRef}
                >
                    <label>Status</label>

                    <button
                        type="button"
                        className={`custom-select-trigger ${
                            statusMenuOpen ? "open" : ""
                        }`}
                        onClick={() =>
                            setStatusMenuOpen(
                                !statusMenuOpen
                            )
                        }
                        aria-expanded={statusMenuOpen}
                    >
                        <span>
                            {getSelectedStatusLabel()}
                        </span>

                        <span
                            className={`custom-select-arrow ${
                                statusMenuOpen
                                    ? "rotate"
                                    : ""
                            }`}
                        >
                            ▾
                        </span>
                    </button>

                    {statusMenuOpen && (
                        <div className="custom-select-menu">
                            {statusOptions.map(
                                (option) => (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className={`custom-select-option ${
                                            statusFilter ===
                                            option.value
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setStatusFilter(
                                                option.value
                                            );
                                            setStatusMenuOpen(
                                                false
                                            );
                                        }}
                                    >
                                        <span>
                                            {
                                                option.label
                                            }
                                        </span>

                                        {statusFilter ===
                                            option.value && (
                                            <span className="select-check">
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </div>

                <div className="filter-group">
                    <label htmlFor="categoryFilter">
                        Category
                    </label>

                    <input
                        id="categoryFilter"
                        type="text"
                        placeholder="Search category..."
                        value={categoryFilter}
                        onChange={(event) =>
                            setCategoryFilter(
                                event.target.value
                            )
                        }
                    />
                </div>
            </section>

            <section className="reports-list">
                {loading ? (
                    <div className="empty-state">
                        Loading reports...
                    </div>
                ) : filteredReports.length === 0 ? (
                    <div className="empty-state">
                        No reports match the selected filters.
                    </div>
                ) : (
                    filteredReports.map((report) => (
                        <article
                            className="report-card"
                            key={report.id}
                        >
                            <div className="report-card-header">
                                <div>
                                    <span className="case-label">
                                        CASE
                                    </span>

                                    <h3>
                                        {report.caseCode}
                                    </h3>
                                </div>

                                <span
                                    className={`status-badge status-${String(
                                        report.status
                                    )
                                        .toLowerCase()
                                        .replace(
                                            "_",
                                            "-"
                                        )}`}
                                >
                                    {String(
                                        report.status
                                    ).replace(
                                        "_",
                                        " "
                                    )}
                                </span>
                            </div>

                            <div className="report-card-meta">
                                <span>
                                    Category:{" "}
                                    <strong>
                                        {report.category}
                                    </strong>
                                </span>

                                <span>
                                    Submitted:{" "}
                                    <strong>
                                        {report.createdAt
                                            ? new Date(
                                                  report.createdAt
                                              ).toLocaleString()
                                            : "—"}
                                    </strong>
                                </span>
                            </div>

                            <p className="report-description">
                                {report.description}
                            </p>

                            {report.evidenceUrl && (
                                <a
                                    href={report.evidenceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="evidence-link"
                                >
                                    View evidence ↗
                                </a>
                            )}

                            <div className="report-actions">
                                {report.status ===
                                    "SUBMITTED" && (
                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            updateStatus(
                                                report.id,
                                                "UNDER_REVIEW"
                                            )
                                        }
                                    >
                                        Start review
                                    </button>
                                )}

                                {report.status ===
                                    "UNDER_REVIEW" && (
                                    <>
                                        <button
                                            className="primary-button"
                                            onClick={() =>
                                                updateStatus(
                                                    report.id,
                                                    "RESOLVED"
                                                )
                                            }
                                        >
                                            Resolve
                                        </button>

                                        <button
                                            className="secondary-button"
                                            onClick={() =>
                                                updateStatus(
                                                    report.id,
                                                    "DISMISSED"
                                                )
                                            }
                                        >
                                            Dismiss
                                        </button>
                                    </>
                                )}
                            </div>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}

export default ModeratorPage;