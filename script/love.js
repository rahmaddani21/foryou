document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("heart");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const width = canvas.width;
  const height = canvas.height;

  // Skala ukuran love (proporsional dengan layar)
  const scale = Math.min(width, height) / 25;

  // Fungsi posisi titik love
  function heartPosition(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return [x, -y];
  }

  let t = 0;
  let points = [];

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Gambar garis
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      ctx.lineTo(width / 2 + x * scale, height / 2 + y * scale);
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Tambah titik baru untuk animasi
    if (t <= Math.PI * 2) {
      points.push(heartPosition(t));
      t += 0.02;
      requestAnimationFrame(draw);
    } else {
      // Tambahkan teks setelah selesai
      ctx.font = "32px Arial";
      ctx.fillStyle = "lightblue";
      ctx.textAlign = "center";
      ctx.fillText("Ni Buat Kamu", width / 2, height / 2 + 150);
    }
  }

  draw();
});
