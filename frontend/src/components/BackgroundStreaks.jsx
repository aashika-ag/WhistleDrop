import { useEffect, useRef } from "react";

function BackgroundStreaks() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");

        let width = window.innerWidth;
        let height = window.innerHeight;

        const streaks = [];

        const streakCount = 10;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(
                window.devicePixelRatio,
                0,
                0,
                window.devicePixelRatio,
                0,
                0
            );
        };

        const createStreak = (randomY = true) => {
            return {
                x: Math.random() * width,
                y: randomY
                    ? Math.random() * height
                    : -Math.random() * 150,

                length:
                    45 + Math.random() * 110,

                speed:
                    1 + Math.random() * 2,

                thickness:
                    0.5 + Math.random() * 1.2,

                opacity:
                    0.08 + Math.random() * 0.22,

                angle:
                    Math.PI / 5 +
                    (Math.random() - 0.5) * 0.18
            };
        };

        for (let i = 0; i < streakCount; i++) {
            streaks.push(createStreak());
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const lightMode =
                document.documentElement.getAttribute(
                    "data-theme"
                ) === "light";

            streaks.forEach((streak, index) => {
                streak.x +=
                    Math.cos(streak.angle) *
                    streak.speed;

                streak.y +=
                    Math.sin(streak.angle) *
                    streak.speed;

                if (
                    streak.x > width + 150 ||
                    streak.y > height + 150
                ) {
                    streaks[index] =
                        createStreak(false);
                }

                const tailX =
                    streak.x -
                    Math.cos(streak.angle) *
                        streak.length;

                const tailY =
                    streak.y -
                    Math.sin(streak.angle) *
                        streak.length;

                const gradient =
                    ctx.createLinearGradient(
                        tailX,
                        tailY,
                        streak.x,
                        streak.y
                    );

                if (lightMode) {
                    gradient.addColorStop(
                        0,
                        "rgba(124,58,237,0)"
                    );

                    gradient.addColorStop(
                        0.55,
                        `rgba(124,58,237,${streak.opacity * 0.35})`
                    );

                    gradient.addColorStop(
                        1,
                        `rgba(124,58,237,${streak.opacity})`
                    );
                } else {
                    gradient.addColorStop(
                        0,
                        "rgba(255,255,255,0)"
                    );

                    gradient.addColorStop(
                        0.55,
                        `rgba(255,255,255,${streak.opacity * 0.35})`
                    );

                    gradient.addColorStop(
                        1,
                        `rgba(255,255,255,${streak.opacity})`
                    );
                }

                ctx.beginPath();

                ctx.moveTo(tailX, tailY);

                ctx.lineTo(
                    streak.x,
                    streak.y
                );

                ctx.strokeStyle = gradient;

                ctx.lineWidth =
                    streak.thickness;

                ctx.lineCap = "round";

                ctx.shadowBlur = 5;

                ctx.shadowColor = lightMode
                    ? "rgba(124,58,237,0.45)"
                    : "rgba(255,255,255,0.45)";

                ctx.stroke();

                ctx.shadowBlur = 0;
            });

            requestAnimationFrame(draw);
        };

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        const animationFrame =
            requestAnimationFrame(draw);

        return () => {
            window.removeEventListener(
                "resize",
                resize
            );

            cancelAnimationFrame(
                animationFrame
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="background-streaks"
        />
    );
}

export default BackgroundStreaks;