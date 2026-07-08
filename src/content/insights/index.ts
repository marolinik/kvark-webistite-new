import type { Insight } from "./types";
import { theSovereigntyTest } from "./the-sovereignty-test";
import { euAiActAfterTheOmnibus } from "./eu-ai-act-after-the-omnibus";
import { nis2DoraEnterpriseAi } from "./nis2-dora-enterprise-ai";
import { inferenceTimeResidency } from "./inference-time-residency";
import { airGappedAiArchitecture } from "./air-gapped-ai-architecture";
import { onPremiseAiTco } from "./on-premise-ai-tco";
import { openWeightModelsMid2026 } from "./open-weight-models-mid-2026";
import { permissionAwareRag } from "./permission-aware-rag";
import { sovereignAiBriefingJuly2026 } from "./sovereign-ai-briefing-july-2026";

/**
 * All published insights, newest first.
 * Add new articles here — the hub, homepage section, SEO meta and
 * related-article logic all read from this list.
 */
export const insights: Insight[] = [
  sovereignAiBriefingJuly2026,
  theSovereigntyTest,
  euAiActAfterTheOmnibus,
  openWeightModelsMid2026,
  nis2DoraEnterpriseAi,
  inferenceTimeResidency,
  airGappedAiArchitecture,
  permissionAwareRag,
  onPremiseAiTco,
].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}
