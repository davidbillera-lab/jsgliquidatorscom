import * as React from "react";
import { Calculator, Handshake, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "@/lib/router-compat";

const COMMISSION_RATE = 0.35;
const CLIENT_RATE = 0.65;
const MAX_GROSS = 100000;
const QUICK_TIERS = [5000, 10000, 25000, 50000];

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const digitsOnly = (value: string) => value.replace(/[^0-9]/g, "");

const PricingCalculator = () => {
  const [grossText, setGrossText] = React.useState("12000");
  const [cleanoutText, setCleanoutText] = React.useState("");

  const gross = Math.min(MAX_GROSS, Number(digitsOnly(grossText) || 0));
  const cleanout = Number(digitsOnly(cleanoutText) || 0);

  const commission = Math.round(gross * COMMISSION_RATE);
  const clientKeeps = gross - commission;
  const netAfterCleanout = clientKeeps - cleanout;
  const showCleanout = cleanout > 0;

  return (
    <div className="max-w-4xl mx-auto bg-secondary rounded-xl p-8 md:p-10">
      <div className="flex items-start gap-3 mb-6">
        <Calculator className="w-8 h-8 text-primary flex-shrink-0" />
        <div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-1">
            Commission Estimator
          </h3>
          <p className="text-muted-foreground text-sm">
            Enter the total sale price of the items you approve for sale. The estimate shows the
            35% commission and the 65% you keep. It works the same for online auctions, our eBay
            store, and e-commerce consignment.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Label htmlFor="gross-sales" className="text-foreground mb-2 block">
            Total sale price of items sold
          </Label>
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="gross-sales"
              inputMode="numeric"
              value={grossText}
              onChange={(e) => setGrossText(digitsOnly(e.target.value))}
              className="pl-7"
              aria-describedby="gross-sales-help"
            />
          </div>
          <Slider
            aria-label="Total sale price of items sold"
            value={[gross]}
            min={0}
            max={MAX_GROSS}
            step={500}
            onValueChange={([value]) => setGrossText(String(value))}
            className="mb-3"
          />
          <p id="gross-sales-help" className="text-xs text-muted-foreground">
            Slide or type an amount up to {money(MAX_GROSS)}. This is the gross sale price before
            any commission.
          </p>
        </div>

        <div>
          <Label htmlFor="cleanout-quote" className="text-foreground mb-2 block">
            Your upfront cleanout quote <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="cleanout-quote"
              inputMode="numeric"
              placeholder="0"
              value={cleanoutText}
              onChange={(e) => setCleanoutText(digitsOnly(e.target.value))}
              className="pl-7"
              aria-describedby="cleanout-quote-help"
            />
          </div>
          <p id="cleanout-quote-help" className="text-xs text-muted-foreground">
            Optional. Enter the cleanout cost from your written plan to see how sale proceeds line
            up against it. Cleanout work is always paid upfront and is quoted per job after a free
            walkthrough.
          </p>
        </div>
      </div>

      <div
        aria-live="polite"
        className="grid sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-border"
      >
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
            JSG commission (35%)
          </p>
          <p className="text-4xl font-display font-bold text-muted-foreground">
            {money(commission)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-primary mb-1">You keep (65%)</p>
          <p className="text-4xl md:text-5xl font-display font-bold text-primary">
            {money(clientKeeps)}
          </p>
        </div>
      </div>

      {showCleanout && (
        <div className="mt-6 rounded-lg bg-background p-5">
          <p className="text-sm text-muted-foreground mb-2 flex items-start gap-3">
            <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>
              Comparing your {money(clientKeeps)} in sale proceeds against a {money(cleanout)}{" "}
              upfront cleanout cost:
            </span>
          </p>
          {netAfterCleanout >= 0 ? (
            <p className="text-foreground font-semibold">
              This estimate leaves {money(netAfterCleanout)} after the cleanout cost is paid.
            </p>
          ) : (
            <p className="text-foreground font-semibold">
              This estimate falls {money(Math.abs(netAfterCleanout))} short of the cleanout cost.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
          Quick reference
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setGrossText(String(tier))}
              className={`rounded-lg p-4 text-left transition-colors ${
                gross === tier ? "bg-primary/10 ring-1 ring-primary" : "bg-background hover:bg-muted"
              }`}
            >
              <p className="text-sm text-muted-foreground">{money(tier)} sold</p>
              <p className="text-lg font-semibold text-foreground">
                {money(Math.round(tier * CLIENT_RATE))}
              </p>
              <p className="text-xs text-muted-foreground">you keep</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-primary/10 p-5">
        <p className="text-sm text-foreground flex items-start gap-3">
          <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <span>
            <strong>This is an illustration, not a quote.</strong> What items sell and for how much
            varies, so no amount is guaranteed. Your written plan spells out the actual commission
            terms per item and the upfront cleanout cost before any work begins.
          </span>
        </p>
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="accent" size="lg">
          <Link to="/contact">Get a Written Quote for Your Items</Link>
        </Button>
      </div>
    </div>
  );
};

export default PricingCalculator;
