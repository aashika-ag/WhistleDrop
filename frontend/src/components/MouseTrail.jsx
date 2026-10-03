import { useEffect, useRef } from "react";

function MouseTrail() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let previousX = mouseX;
        let previousY = mouseY;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const draw = () => {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            const darkMode =
                document.documentElement.getAttribute(
                    "data-theme"
                ) !== "light";

            const dx = mouseX - previousX;
            const dy = mouseY - previousY;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            if (distance > 1) {
                const gradient = ctx.createLinearGradient(
                    previousX,
                    previousY,
                    mouseX,
                    mouseY
                );

                if (darkMode) {
                    gradient.addColorStop(
                        0,
                        "rgba(255,255,255,0)"
                    );

                    gradient.addColorStop(
                        0.5,
                        "rgba(255,255,255,0.55)"
                    );

                    gradient.addColorStop(
                        1,
                        "rgba(255,255,255,0.95)"
                    );
                } else {
                    gradient.addColorStop(
                        0,
                        "rgba(124,58,237,0)"
                    );

                    gradient.addColorStop(
                        0.5,
                        "rgba(124,58,237,0.45)"
                    );

                    gradient.addColorStop(
                        1,
                        "rgba(124,58,237,0.9)"
                    );
                }

                ctx.beginPath();

                ctx.moveTo(
                    previousX,
                    previousY
                );

                ctx.lineTo(
                    mouseX,
                    mouseY
                );

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.4;
                ctx.lineCap = "round";

                ctx.shadowBlur = 9;

                ctx.shadowColor = darkMode
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(124,58,237,0.8)";

                ctx.stroke();
            }

            previousX +=
                (mouseX - previousX) * 0.18;

            previousY +=
                (mouseY - previousY) * 0.18;

            requestAnimationFrame(draw);
        };

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        const animationFrame =
            requestAnimationFrame(draw);

        return () => {
            window.removeEventListener(
                "resize",
                resizeCanvas
            );

            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            cancelAnimationFrame(
                animationFrame
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="mouse-trail"
        />
    );
}

export default MouseTrail;