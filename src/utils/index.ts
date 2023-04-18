export type Mode = "POST" | "GET";

const currFetch1 = "https://efb2-190-166-222-110.ngrok-free.app/api/";
const currFetch2 = "http://localhost:3000/api/";

export function Fetch(uri: string, mode: Mode, body?: any) {
  switch (mode) {
    case "GET":
      return fetch(currFetch2 + uri, {
        headers: {
          "User-Agent": "custom/non-standard",
        },
      });
    case "POST":
      return fetch(currFetch2 + uri, {
        body,
        method: "POST",
        headers: {
          "User-Agent": "custom/non-standard",
        },
      });
  }
}

export type Poster = {
  Año: Date;
  AñoC: Date;
  Director: string;
  Genero: string;
  Id: number;
  Poster: string;
  Titulo: string;
};

export function toDataURL(img: ArrayBuffer, contentType: string) {
  const image = Buffer.from(
    new Uint8Array(img).reduce((data, byte) => data + String.fromCharCode(byte), ""),
    "base64"
  );
  return `data:${contentType};base64,${image}`;
}
