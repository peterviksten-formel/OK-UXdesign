import { useEffect } from "react";
import { useEditorialGuide, type PageBrief as PageBriefData } from "../lib/EditorialGuideContext";

/**
 * Invisible component — registers the page's editorial brief.
 * Rendered in the Copy-guide panel, never in the page itself.
 */
export function PageBrief(props: PageBriefData) {
  const { setBrief } = useEditorialGuide();

  useEffect(() => {
    setBrief(props);
    return () => setBrief(null);
  }, [props.kategori, props.syfte, props.malgrupp, props.primarHandling, props.ton, setBrief]);

  return null;
}
