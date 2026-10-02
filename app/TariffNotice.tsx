"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function TariffNotice({ fee, active = true }: { fee: number; active?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (active && dialog && !dialog.open) dialog.showModal();
    return () => dialog?.close();
  }, [active]);

  return <>
    <div className="tariff-reminder">
      <span><b>5% tariff fee · demo</b> Calculated on merchandise after any first-order discount, before shipping.</span>
      <button ref={returnFocusRef} type="button" onClick={() => dialogRef.current?.showModal()}>Replay the announcement ↗</button>
    </div>
    <dialog ref={dialogRef} className="tariff-dialog" aria-labelledby="tariff-title" aria-describedby="tariff-quote tariff-disclosure" onClose={() => returnFocusRef.current?.focus({ preventScroll: true })}>
      <button className="tariff-close" type="button" aria-label="Close tariff announcement" onClick={() => dialogRef.current?.close()}>×</button>
      <div className="tariff-comic">
        <div className="tariff-character">
          <Image src="/brand-assets/svg/pow-icon-impact.svg" alt="" width={100} height={100} unoptimized className="tariff-pow"/>
          <Image src="/images/trump-comic-cutout.png" alt="Orange-faced cartoon caricature of Donald Trump speaking" width={1230} height={1278} unoptimized className="tariff-cutout"/>
          <span className="tariff-sticker" aria-hidden="true">+5%</span>
        </div>
        <div className="tariff-speech">
          <span className="tariff-eyebrow">A little checkout interruption</span>
          <h2 id="tariff-title">The tariff<br/><em>plot twist.</em></h2>
          <blockquote id="tariff-quote">Sorry, but because of the war there is a 5% tariff fee added to your order. Once the war is over so is this additional fee.</blockquote>
          <p id="tariff-disclosure">Parody · fictional quote. This is a POW! demo surcharge, not a government tax.</p>
          <div className="tariff-fee"><span>5% of merchandise<br/><small>No real charge</small></span><strong>+${fee.toFixed(2)}</strong></div>
          <button className="tariff-continue" type="button" onClick={() => dialogRef.current?.close()}>Got it. Back to checkout →</button>
        </div>
      </div>
    </dialog>
  </>;
}
