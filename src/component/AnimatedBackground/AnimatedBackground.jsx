import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const mouse = {
      x: width / 8,
      y: height / 8,
      prevX: width / 6,
      prevY: height / 2,
      velocityX: 0,
      velocityY: 0,
    };

    const dots = [];
    const DOT_COUNT = Math.min(500, Math.floor((width * height) / 14000));

    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: 0,
        baseY: 0,
        size: Math.random() * 1.5 + 1.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      });
    }

    dots.forEach((dot) => {
      dot.baseX = dot.x;
      dot.baseY = dot.y;
    });

    const handleMouseMove = (e) => {
      mouse.velocityX = e.clientX - mouse.prevX;
      mouse.velocityY = e.clientY - mouse.prevY;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse movement gradually affects the whole network
      const movementX = mouse.velocityX * 1;
      const movementY = mouse.velocityY * 1;

      dots.forEach((dot) => {
        // Natural movement
        dot.baseX += dot.vx;
        dot.baseY += dot.vy;

        // Keep dots inside screen
        if (dot.baseX < 0 || dot.baseX > width) {
          dot.vx *= -1;
        }

        if (dot.baseY < 0 || dot.baseY > height) {
          dot.vy *= -1;
        }

        // Mouse directional movement
        dot.x += (dot.baseX + movementX * 2 - dot.x) * 0.050;
        dot.y += (dot.baseY + movementY * 2 - dot.y) * 0.050;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const opacity = 1 - distance / 200;

            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);

            ctx.strokeStyle = `rgba(255, 255, 255, ${
              opacity * 0.22
            })`;

            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Smooth mouse velocity
      mouse.velocityX *= 0.92;
      mouse.velocityY *= 0.92;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-network" />;
};

export default AnimatedBackground;