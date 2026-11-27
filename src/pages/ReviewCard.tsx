import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { REVIEW_SHORT_URL } from "@/data/reviewLink";

const QR_OPTS = { errorCorrectionLevel: "H" as const, margin: 2 };

function download(href: string, name: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
}

export default function ReviewCard({ variant = "thanks" }: { variant?: "thanks" | "pickup" }) {
  const pickup = variant === "pickup";
  const target = pickup ? `${REVIEW_SHORT_URL}?from=pickup` : REVIEW_SHORT_URL;
  const [svg, setSvg] = useState("");
  const [size, setSize] = useState<"card" | "letter">("card");
  const letter = pickup && size === "letter";
  useEffect(() => {
    QRCode.toString(target, { ...QR_OPTS, type: "svg" }).then(setSvg);
  }, [target]);

  const downloadPng = async () => {
    download(await QRCode.toDataURL(target, { ...QR_OPTS, width: 1600 }), pickup ? "jsg-pickup-review-qr.png" : "jsg-review-qr.png");
  };
  const downloadSvg = () => {
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    download(url, pickup ? "jsg-pickup-review-qr.svg" : "jsg-review-qr.svg");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="review-card-page min-h-screen bg-muted flex flex-col items-center justify-center gap-6 p-6">
      <style>{`
        @page { size: ${letter ? "8.5in 11in" : "4in 6in"}; margin: 0; }
        @media print {
          body * { visibility: hidden !important; }
          .review-card, .review-card * { visibility: visible !important; }
          .review-card { position: fixed; inset: 0; width: ${letter ? "8.5in" : "4in"} !important; height: ${letter ? "11in" : "6in"} !important; max-width: none !important; box-shadow: none !important; border: 0 !important; border-radius: 0 !important; }
          .no-print { display: none !important; }
        }
      `}</style>
      <section className={`review-card bg-background text-foreground max-w-full rounded-lg border shadow-lg flex flex-col items-center justify-center text-center ${letter ? "w-[8.5in] h-[11in] gap-8 p-[0.75in]" : "w-[4in] h-[6in] gap-4 p-[0.35in]"}`}>
        <img src="/logo-square.png" alt="JSG Liquidators" className={letter ? "h-[1.6in] w-auto" : "h-[0.9in] w-auto"} />
        <h1 className={`${letter ? "text-5xl" : "text-2xl"} font-bold leading-tight`}>{pickup ? "Enjoy your finds" : "Thank you for trusting us"}</h1>
        <p className={`${letter ? "text-2xl" : "text-sm"} leading-snug`}>{pickup ? "Thanks for bidding with us. A quick Google review helps more people find our auctions." : "If we did right by you, a quick Google review helps other families find us."}</p>
        <div className={`${letter ? "w-[4.5in] h-[4.5in]" : "w-[2.3in] h-[2.3in]"} [&_svg]:w-full [&_svg]:h-full`} aria-label="QR code to leave a Google review" dangerouslySetInnerHTML={{ __html: svg }} />
        <p className={letter ? "text-lg" : "text-xs"}>jsgliquidators.com/review</p>
      </section>
      <div className="no-print flex gap-3">
        <Button onClick={downloadPng}>Download PNG</Button>
        <Button variant="outline" onClick={downloadSvg} disabled={!svg}>Download SVG</Button>
        {pickup && (
          <Button variant="outline" onClick={() => setSize(letter ? "card" : "letter")}>
            {letter ? "Show 4×6 card" : "Show 8.5×11 sign"}
          </Button>
        )}
        <Button variant="secondary" onClick={() => window.print()}>Print card</Button>
      </div>
    </div>
  );
}
