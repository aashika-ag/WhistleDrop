import { useEffect, useState } from "react";

function SettingsPanel({ onClose }) {
    const [theme, setTheme] = useState(
        localStorage.getItem("whistledrop-theme") || "dark"
    );

    const [fontSize, setFontSize] = useState(
        localStorage.getItem("whistledrop-font-size") || "medium"
    );

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "whistledrop-theme",
            theme
        );
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-font-size",
            fontSize
        );

        localStorage.setItem(
            "whistledrop-font-size",
            fontSize
        );
    }, [fontSize]);

    const resetSettings = () => {
        const defaultTheme = "dark";
        const defaultFontSize = "medium";

        setTheme(defaultTheme);
        setFontSize(defaultFontSize);

        document.documentElement.setAttribute(
            "data-theme",
            defaultTheme
        );

        document.documentElement.setAttribute(
            "data-font-size",
            defaultFontSize
        );

        localStorage.removeItem(
            "whistledrop-theme"
        );

        localStorage.removeItem(
            "whistledrop-font-size"
        );
    };

    return (
        <>
            <div
                className="settings-overlay"
                onClick={onClose}
            />

            <aside className="settings-panel">
                <div className="settings-header">
                    <div>
                        <p
                            style={{
                                color: "var(--primary-light)",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                marginBottom: "5px"
                            }}
                        >
                            Preferences
                        </p>

                        <h2>Settings</h2>
                    </div>

                    <button
                        className="icon-button"
                        onClick={onClose}
                        aria-label="Close settings"
                    >
                        ✕
                    </button>
                </div>

                <section className="settings-section">
                    <h4>Appearance</h4>

                    <div className="settings-options">
                        <button
                            className={`settings-option ${
                                theme === "dark"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setTheme("dark")
                            }
                        >
                            <span>◐</span>
                            <span>
                                <strong>Dark</strong>
                                <small>
                                    {" "}Deep developer theme
                                </small>
                            </span>
                        </button>

                        <button
                            className={`settings-option ${
                                theme === "light"
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                setTheme("light")
                            }
                        >
                            <span>☀</span>
                            <span>
                                <strong>Light</strong>
                                <small>
                                    {" "}Clean bright theme
                                </small>
                            </span>
                        </button>
                    </div>
                </section>

                <section className="settings-section">
                    <h4>Text size</h4>

                    <div className="font-size-control">
                        <button
                            className={
                                fontSize === "small"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFontSize("small")
                            }
                            aria-label="Decrease font size"
                        >
                            A−
                        </button>

                        <button
                            className={
                                fontSize === "medium"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFontSize("medium")
                            }
                        >
                            A
                        </button>

                        <button
                            className={
                                fontSize === "large"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFontSize("large")
                            }
                            aria-label="Increase font size"
                        >
                            A+
                        </button>
                    </div>

                    <p className="form-help">
                        Adjust the interface text size.
                    </p>
                </section>

                <div className="settings-divider" />

                <button
                    className="reset-settings"
                    onClick={resetSettings}
                >
                    <span>↺</span>
                    Reset settings
                </button>

                <p
                    style={{
                        marginTop: "18px",
                        color: "var(--text-muted)",
                        fontSize: "0.72rem",
                        lineHeight: 1.6
                    }}
                >
                    Your preferences are stored locally in
                    your browser.
                </p>
            </aside>
        </>
    );
}

export default SettingsPanel;