import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <main className="page hero">
                <div className="hero-orb" />

                <section className="hero-content">
                    <div className="eyebrow">
                        <span className="eyebrow-dot" />
                        Confidential Reporting Platform
                    </div>

                    <h1 className="hero-title">
                        Speak up.
                        <br />
                        <span className="gradient-text">
                            Stay anonymous.
                        </span>
                    </h1>

                    <p className="page-description">
                        WhistleDrop gives you a secure and
                        confidential way to report concerns
                        without revealing your identity. Submit
                        a report, receive a private case code,
                        and track its progress anonymously.
                    </p>

                    <div className="hero-actions">
                        <Link
                            to="/report"
                            className="btn btn-primary"
                        >
                            Submit a Report
                            <span>→</span>
                        </Link>

                        <Link
                            to="/track"
                            className="btn btn-secondary"
                        >
                            Track a Report
                        </Link>
                    </div>
                </section>
            </main>

            <section className="page">
                <div className="feature-grid">
                    <div className="glass-card feature-card">
                        <div className="feature-icon">
                            ◈
                        </div>

                        <h3>Anonymous by design</h3>

                        <p>
                            No name, email address or personal
                            identity is required to submit a
                            report.
                        </p>
                    </div>

                    <div className="glass-card feature-card">
                        <div className="feature-icon">
                            #
                        </div>

                        <h3>Private case code</h3>

                        <p>
                            Every report receives a unique case
                            code that lets you track its status
                            privately.
                        </p>
                    </div>

                    <div className="glass-card feature-card">
                        <div className="feature-icon">
                            ✓
                        </div>

                        <h3>Transparent status</h3>

                        <p>
                            Follow your report through its
                            lifecycle from submission to final
                            resolution.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                WhistleDrop · Confidential reporting made simple.
            </footer>
        </>
    );
}

export default Home;