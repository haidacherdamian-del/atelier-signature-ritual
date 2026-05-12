import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { IdleScreen } from "@/components/atelier/IdleScreen";
import { WelcomeTransition } from "@/components/atelier/WelcomeTransition";
import { ScanningRitual } from "@/components/atelier/ScanningRitual";
import { ModelSelection } from "@/components/atelier/ModelSelection";
import { LastSelection } from "@/components/atelier/LastSelection";
import { FinishSelection } from "@/components/atelier/FinishSelection";
import { SneakerSilhouetteNotice } from "@/components/atelier/SneakerSilhouetteNotice";

import { Signature } from "@/components/atelier/Signature";
import { CinematicReveal } from "@/components/atelier/CinematicReveal";
import { Checkout } from "@/components/atelier/Checkout";
import { Confirmation } from "@/components/atelier/Confirmation";
import type { BespokeOrder, ShoeModel } from "@/components/atelier/types";

export const Route = createFileRoute("/")({
  component: Atelier,
});

type Stage =
  | "idle"
  | "welcome"
  | "scan"
  | "model"
  | "last"
  | "sneakerNotice"
  | "finish"
  | "signature"
  | "reveal"
  | "checkout"
  | "confirm";

const FINISH_MODELS = new Set<ShoeModel>(["oxford", "derby", "monk"]);
const NO_LAST_MODELS = new Set<ShoeModel>(["sneaker"]);

const initialOrder: BespokeOrder = {
  model: null,
  leather: "calf",
  color: "obsidian",
  sole: "leather",
  stitching: "tone",
  finish: "polished",
  last: "almond",
  signature: "",
  customer: { name: "", email: "", address: "" },
};

function Atelier() {
  const [stage, setStage] = useState<Stage>("idle");
  const [order, setOrder] = useState<BespokeOrder>(initialOrder);

  const update = useCallback((patch: Partial<BespokeOrder>) => {
    setOrder((o) => ({ ...o, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setOrder(initialOrder);
    setStage("idle");
  }, []);

  const afterModel = (model: ShoeModel) => (FINISH_MODELS.has(model) ? "finish" : "signature");

  return (
    <main className="grain relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <AnimatePresence mode="wait">
        {stage === "idle" && <IdleScreen key="idle" onBegin={() => setStage("welcome")} />}
        {stage === "welcome" && <WelcomeTransition key="welcome" onContinue={() => setStage("scan")} />}
        {stage === "scan" && <ScanningRitual key="scan" onComplete={() => setStage("last")} onBack={() => setStage("welcome")} />}
        {stage === "last" && (
          <LastSelection
            key="last"
            onSelect={(last) => {
              update({ last });
              setStage("model");
            }}
            onBack={() => setStage("scan")}
          />
        )}
        {stage === "model" && (
          <ModelSelection
            key="model"
            onSelect={(model: ShoeModel) => {
              update({ model });
              setStage(afterModel(model));
            }}
            onBack={() => setStage("last")}
          />
        )}
        {stage === "finish" && (
          <FinishSelection
            key="finish"
            onSelect={(choice) => {
              update({ finish: choice === "patina" ? "patina" : "polished" });
              setStage("signature");
            }}
            onBack={() => setStage("model")}
          />
        )}
        {stage === "signature" && (
          <Signature
            key="signature"
            value={order.signature}
            onChange={(signature) => update({ signature })}
            onContinue={() => setStage("reveal")}
            onBack={() =>
              setStage(order.model && FINISH_MODELS.has(order.model) ? "finish" : "model")
            }
          />
        )}
        {stage === "reveal" && <CinematicReveal key="reveal" order={order} onContinue={() => setStage("checkout")} />}
        {stage === "checkout" && (
          <Checkout
            key="checkout"
            customer={order.customer}
            onUpdate={(customer) => update({ customer })}
            onComplete={() => setStage("confirm")}
            onBack={() => setStage("reveal")}
          />
        )}
        {stage === "confirm" && <Confirmation key="confirm" order={order} onReset={reset} />}
      </AnimatePresence>
    </main>
  );
}
