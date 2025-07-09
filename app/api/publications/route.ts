import { NextResponse } from "next/server";

const ORCID_ID = "0000-0002-2599-9119";
const ORCID_API_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;

export async function GET() {
  try {
    const res = await fetch(ORCID_API_URL, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch publications" },
        { status: 500 }
      );
    }
    const data = await res.json();
    // ORCID works are in data.group
    type Work = {
      title: string;
      year: number | null;
      externalIds: { type: string; value: string; url: string | null }[];
      url: string | null;
      journal: string | null;
      type: string | null;
      contributors: any;
    };
    const works: Work[] = await Promise.all(
      (data.group || []).map(async (item: any) => {
        const summary = item["work-summary"][0];
        // Parse authors from contributors
        let authors = "";
        if (summary.contributors && summary.contributors.contributor) {
          authors = summary.contributors.contributor
            .map(
              (c: any) =>
                c["credit-name"]?.value || c["contributor-orcid"]?.path || ""
            )
            .filter(Boolean)
            .join(", ");
        }
        // Try to fetch full work details for abstract/description
        let abstract = null;
        let publisher = null;
        let citation = null;
        try {
          if (summary["put-code"]) {
            const workRes = await fetch(
              `https://pub.orcid.org/v3.0/${ORCID_ID}/work/${summary["put-code"]}`,
              { headers: { Accept: "application/json" } }
            );
            if (workRes.ok) {
              const workData = await workRes.json();
              abstract = workData["short-description"] || null;
              publisher = workData["publisher"]?.value || null;
              citation = workData["citation"]?.citation || null;
            }
          }
        } catch {}
        return {
          title: summary.title?.title?.value || "Untitled",
          year: summary["publication-date"]?.year?.value
            ? parseInt(summary["publication-date"].year.value, 10)
            : null,
          externalIds:
            summary["external-ids"]?.["external-id"]?.map((eid: any) => ({
              type: eid["external-id-type"],
              value: eid["external-id-value"],
              url: eid["external-id-url"]?.value || null,
            })) || [],
          url: summary.url?.value || null,
          journal: summary["journal-title"]?.value || null,
          type: summary["type"] || null,
          authors,
          abstract,
          publisher,
          citation,
        };
      })
    );
    // Sort by year descending
    works.sort((a: any, b: any) => (b.year || 0) - (a.year || 0));
    return NextResponse.json(works);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
