export type ShoeModel = "oxford" | "derby" | "loafer" | "monk" | "sneaker";

export type Customer = {
  name: string;
  email: string;
  address: string;
};

export type BespokeOrder = {
  model: ShoeModel | null;
  leather: "calf" | "suede" | "exotic";
  color: "obsidian" | "cognac" | "oxblood" | "ivory" | "olive";
  sole: "leather" | "rubber" | "mixed";
  stitching: "tone" | "contrast";
  finish: "matte" | "polished" | "patina";
  signature: string;
  customer: Customer;
};

export const MODEL_META: Record<
  ShoeModel,
  { name: string; tagline: string; image: string }
> = {
  oxford: { name: "Oxford", tagline: "Zeitlose Struktur", image: "" },
  derby: { name: "Derby", tagline: "Verfeinerte Leichtigkeit", image: "" },
  loafer: { name: "Loafer", tagline: "Stille Eleganz", image: "" },
  monk: { name: "Monk Strap", tagline: "Markantes Detail", image: "" },
  sneaker: { name: "Minimal Sneaker", tagline: "Moderne Zurückhaltung", image: "" },
};

export const COLOR_META: Record<BespokeOrder["color"], { name: string; hex: string }> = {
  obsidian: { name: "Obsidian", hex: "#0a0807" },
  cognac: { name: "Cognac", hex: "#5a3018" },
  oxblood: { name: "Oxblood", hex: "#3d1014" },
  ivory: { name: "Elfenbein", hex: "#e8dfcc" },
  olive: { name: "Olive", hex: "#3a3a1f" },
};
