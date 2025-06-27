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
    const works: Work[] = (data.group || []).map((item: any) => {
      const summary = item["work-summary"][0];
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
        contributors: summary["contributors"] || null,
      };
    });
    // Sort by year descending
    works.sort((a: Work, b: Work) => (b.year || 0) - (a.year || 0));
    return NextResponse.json(works);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
