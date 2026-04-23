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
  oxford: { name: "The Oxford", tagline: "Timeless structure", image: "" },
  derby: { name: "The Derby", tagline: "Refined ease", image: "" },
  loafer: { name: "The Loafer", tagline: "Quiet sophistication", image: "" },
  monk: { name: "The Monk", tagline: "Singular detail", image: "" },
  sneaker: { name: "The Minimal", tagline: "Modern restraint", image: "" },
};

export const COLOR_META: Record<BespokeOrder["color"], { name: string; hex: string }> = {
  obsidian: { name: "Obsidian", hex: "#0a0807" },
  cognac: { name: "Cognac", hex: "#5a3018" },
  oxblood: { name: "Oxblood", hex: "#3d1014" },
  ivory: { name: "Ivory", hex: "#e8dfcc" },
  olive: { name: "Olive", hex: "#3a3a1f" },
};
