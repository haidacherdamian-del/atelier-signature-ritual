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
import { Customization } from "@/components/atelier/Customization";

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
  | "customize"
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

  const afterModel = (model: ShoeModel): Stage =>
    NO_LAST_MODELS.has(model) ? "sneakerNotice" : "last";

  const afterLast = (model: ShoeModel | null): Stage =>
    model && FINISH_MODELS.has(model) ? "finish" : "customize";

  return (
    <main className="grain relative h-screen w-screen overflow-hidden bg-background text-foreground">
      <AnimatePresence mode="wait">
        {stage === "idle" && <IdleScreen key="idle" onBegin={() => setStage("welcome")} />}
        {stage === "welcome" && <WelcomeTransition key="welcome" onContinue={() => setStage("scan")} />}
        {stage === "scan" && <ScanningRitual key="scan" onComplete={() => setStage("model")} onBack={() => setStage("welcome")} />}
        {stage === "model" && (
          <ModelSelection
            key="model"
            onSelect={(model: ShoeModel) => {
              update({ model });
              setStage(afterModel(model));
            }}
            onBack={() => setStage("scan")}
          />
        )}
        {stage === "last" && (
          <LastSelection
            key="last"
            model={order.model}
            onSelect={(last) => {
              update({ last });
              setStage(afterLast(order.model));
            }}
            onBack={() => setStage("model")}
          />
        )}
        {stage === "sneakerNotice" && (
          <SneakerSilhouetteNotice
            key="sneakerNotice"
            onContinue={() => setStage(afterLast(order.model))}
            onBack={() => setStage("model")}
          />
        )}
        {stage === "finish" && (
          <FinishSelection
            key="finish"
            onSelect={(choice) => {
              update({ finish: choice === "patina" ? "patina" : "polished" });
              setStage("customize");
            }}
            onBack={() =>
              setStage(order.model && NO_LAST_MODELS.has(order.model) ? "sneakerNotice" : "last")
            }
          />
        )}
        {stage === "customize" && (
          <Customization
            key="customize"
            order={order}
            onUpdate={update}
            onContinue={() => setStage("signature")}
            onBack={() => {
              if (order.model && FINISH_MODELS.has(order.model)) return setStage("finish");
              if (order.model && NO_LAST_MODELS.has(order.model)) return setStage("sneakerNotice");
              return setStage("last");
            }}
          />
        )}
        {stage === "signature" && (
          <Signature
            key="signature"
            value={order.signature}
            onChange={(signature) => update({ signature })}
            onContinue={() => setStage("reveal")}
            onBack={() => setStage("customize")}
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
