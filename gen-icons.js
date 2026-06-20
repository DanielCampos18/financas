// Gera os ícones PNG do app (sem dependências externas).
// Fundo gradiente violeta + gema branca. Roda com: node gen-icons.js
const fs = require("fs");
const zlib = require("zlib");

// ---- CRC32 ----
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// ---- desenho ----
const DIAMOND = [[180,176],[332,176],[372,224],[256,372],[140,224]]; // coords base 512
function inPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    const intersect = (yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

function makePNG(size) {
  const scale = size / 512;
  const poly = DIAMOND.map(([x, y]) => [x * scale, y * scale]);
  // gradiente vertical
  const top = [0x7c, 0x6c, 0xf0], bot = [0x9b, 0x86, 0xf8];
  const white = [0xff, 0xff, 0xff];
  const SS = 3; // supersampling para bordas suaves
  const raw = Buffer.alloc(size * (size * 3 + 1));
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filtro none
    const t = y / (size - 1);
    const bg = [lerp(top[0], bot[0], t), lerp(top[1], bot[1], t), lerp(top[2], bot[2], t)];
    for (let x = 0; x < size; x++) {
      let cov = 0;
      for (let sy = 0; sy < SS; sy++)
        for (let sx = 0; sx < SS; sx++)
          if (inPoly(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS, poly)) cov++;
      const a = cov / (SS * SS);
      raw[p++] = Math.round(bg[0] * (1 - a) + white[0] * a);
      raw[p++] = Math.round(bg[1] * (1 - a) + white[1] * a);
      raw[p++] = Math.round(bg[2] * (1 - a) + white[2] * a);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0; // 8-bit RGB
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}

for (const s of [192, 512, 180]) {
  const name = s === 180 ? "apple-touch-icon.png" : `icon-${s}.png`;
  fs.writeFileSync(name, makePNG(s));
  console.log("ok", name);
}
