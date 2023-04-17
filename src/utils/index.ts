export type Mode = "POST" | "GET";

export function Fetch(uri: string, mode: Mode, body?: any) {
  switch (mode) {
    case "GET":
      return fetch("http://localhost:44302/api/" + uri);
    case "POST":
      return fetch("http://localhost:44302/api/" + uri, { body, method: "POST" });
  }
}
