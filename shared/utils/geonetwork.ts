// utils/getTotalMetadata.ts
export async function getTotalMetadata(): Promise<number | null> {
  const url =
    "https://geonetwork.jatimprov.go.id/geonetwork/srv/api/search/records/_search";

  const payload = {
    size: 0,
    track_total_hits: true,
    query: {
      bool: {
        must: {
          query_string: {
            query: "+isTemplate:n",
          },
        },
      },
    },
    aggs: {
      resourceType: {
        terms: {
          field: "resourceType",
          size: 10,
        },
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Error fetching total metadata: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.hits?.total?.value ?? null;
  } catch (error) {
    console.error("Failed to fetch total metadata:", error);
    return null;
  }
}
