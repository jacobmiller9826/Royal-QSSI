const canvas = document.getElementById('spiralCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 50;
    const points = 600;
    const bones = [
        { angleOffset: 20, label: "Bone 1", color: "#ff0000" },
        { angleOffset: 120, label: "Bone 2", color: "#fff" },
        { angleOffset: 250, label: "Bone 3", color: "#ff0000" },
    ];

    let angle = 0;

    function drawSpiral() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spiral base
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        for (let i = 0; i < points; i++) {
            const radius = (i / points) * maxRadius;
            angle += 0.2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Exit tail
        const tailX = centerX + (maxRadius + 80) * Math.cos(angle);
        const tailY = centerY + (maxRadius + 80) * Math.sin(angle);
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(centerX + maxRadius * Math.cos(angle), centerY + maxRadius * Math.sin(angle));
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Draw bones
        bones.forEach(b => {
            const boneRadius = (points * 0.2) + b.angleOffset;
            const x = centerX + (boneRadius / points) * maxRadius * Math.cos(angle + b.angleOffset/10);
            const y = centerY + (boneRadius / points) * maxRadius * Math.sin(angle + b.angleOffset/10);
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = '14px Montserrat';
            ctx.fillText(b.label, x + 12, y + 5);
        });

        requestAnimationFrame(drawSpiral);
    }

    drawSpiral();
}
