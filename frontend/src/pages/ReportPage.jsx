import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function ReportPage() {
    const [formData, setFormData] = useState({
        category: "",
        description: "",
        evidenceUrl: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState("");

    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
    const categoryMenuRef = useRef(null);

    const categoryOptions = [
        "Harassment",
        "Discrimination",
        "Bullying",
        "Academic Misconduct",
        "Safety",
        "Other"
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryMenuRef.current &&
                !categoryMenuRef.current.contains(event.target)
            ) {
                setCategoryMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleCategoryChange = (category) => {
        setFormData({
            ...formData,
            category
        });

        setCategoryMenuOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setSuccess(null);
        setError("");

        try {
            const response = await api.post(
                "/api/reports",
                formData
            );

            setSuccess(response.data);

            setFormData({
                category: "",
                description: "",
                evidenceUrl: ""
            });
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Unable to submit the report. Please try again.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="page-container">
                <section className="form-card success-card">
                    <div className="success-icon">✓</div>

                    <p className="eyebrow">Report submitted</p>

                    <h1>Your report has been received.</h1>

                    <p className="form-help">
                        Keep the following case code safe. You can use it
                        to check the status of your report without revealing
                        your identity.
                    </p>

                    <div className="case-code-box">
                        <span>YOUR CASE CODE</span>
                        <strong>{success.caseCode}</strong>
                    </div>

                    <div className="form-actions">
                        <Link
                            to={`/track?caseCode=${success.caseCode}`}
                            className="primary-button"
                        >
                            Track this report
                        </Link>

                        <button
                            className="secondary-button"
                            onClick={() => setSuccess(null)}
                        >
                            Submit another
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="page-container">
            <section className="form-card">
                <div className="form-heading">
                    <p className="eyebrow">Confidential reporting</p>

                    <h1>Submit a report</h1>

                    <p className="form-help">
                        Share what happened. No name, email, or personal
                        information is required.
                    </p>
                </div>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category">
                            Category
                        </label>

                        <div
                            className="custom-select-group report-category-select"
                            ref={categoryMenuRef}
                        >
                            <button
                                type="button"
                                className={`custom-select-trigger ${
                                    categoryMenuOpen ? "open" : ""
                                }`}
                                onClick={() =>
                                    setCategoryMenuOpen(
                                        !categoryMenuOpen
                                    )
                                }
                                aria-expanded={categoryMenuOpen}
                            >
                                <span>
                                    {formData.category ||
                                        "Select a category"}
                                </span>

                                <span
                                    className={`custom-select-arrow ${
                                        categoryMenuOpen
                                            ? "rotate"
                                            : ""
                                    }`}
                                >
                                    ▾
                                </span>
                            </button>

                            {categoryMenuOpen && (
                                <div className="custom-select-menu">
                                    <button
                                        type="button"
                                        className={`custom-select-option ${
                                            !formData.category
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleCategoryChange("")
                                        }
                                    >
                                        <span>
                                            Select a category
                                        </span>

                                        {!formData.category && (
                                            <span className="select-check">
                                                ✓
                                            </span>
                                        )}
                                    </button>

                                    {categoryOptions.map(
                                        (option) => (
                                            <button
                                                type="button"
                                                key={option}
                                                className={`custom-select-option ${
                                                    formData.category ===
                                                    option
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleCategoryChange(
                                                        option
                                                    )
                                                }
                                            >
                                                <span>
                                                    {option}
                                                </span>

                                                {formData.category ===
                                                    option && (
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            What happened?
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the incident as clearly as possible..."
                            rows="8"
                            minLength="10"
                            maxLength="5000"
                            required
                        />

                        <p className="form-help">
                            Minimum 10 characters. Maximum 5000 characters.
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="evidenceUrl">
                            Evidence URL
                            <span className="optional">
                                Optional
                            </span>
                        </label>

                        <input
                            id="evidenceUrl"
                            name="evidenceUrl"
                            type="url"
                            value={formData.evidenceUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            maxLength="500"
                        />

                        <p className="form-help">
                            Add a link to relevant evidence if available.
                        </p>
                    </div>

                    <div className="privacy-note">
                        <span>🔒</span>

                        <div>
                            <strong>Your identity stays private</strong>

                            <p>
                                WhistleDrop does not ask for your name,
                                email address, or other identifying details.
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="primary-button submit-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit report"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default ReportPage;