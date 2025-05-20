"use client";

import { useAtom } from "jotai";
import { featureInformationAtom } from "../../state/feature-information";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/data-table";

export default function FeatureInformation() {
  const [featureInformation] = useAtom(featureInformationAtom);
  const [expandedFeatures, setExpandedFeatures] = useState<
    Record<string, boolean>
  >({});

  if (!featureInformation || featureInformation.length === 0) {
    return null;
  }

  const toggleFeature = (featureName: string) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [featureName]: !prev[featureName],
    }));
  };

  return (
    <div className="z-[403] absolute top-5 right-5 bg-white rounded-lg shadow-md p-4 text-gray-900 w-[800px] max-h-[600px] overflow-auto">
      <div className="text-lg font-semibold mb-4">Feature Information</div>

      <div className="">
        {featureInformation.map((feature) => {
          if (feature.info.length === 0) return null;

          const propertyKeys = Array.from(
            new Set(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              feature.info.flatMap((infoItem: { properties: any }) =>
                Object.keys(infoItem.properties || {})
              )
            )
          );

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const columns: ColumnDef<RowData>[] = propertyKeys.map((key: any) => {
            const column: ColumnDef<RowData> = {
              accessorKey: key,
              header: key,
            };
            return column;
          });

          const tableData = feature.info.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (infoItem: { properties: { id: any } }) => ({
              ...infoItem.properties,
              id:
                infoItem.properties?.id ||
                Math.random().toString(36).substring(7),
            })
          );

          const isExpanded = expandedFeatures[feature.name] ?? false;

          return (
            <div key={feature.name} className="border overflow-hidden">
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                onClick={() => toggleFeature(feature.name)}
              >
                <span className="font-medium">{feature.name}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {isExpanded && (
                <div className="p-4 border-t">
                  {tableData.length > 0 ? (
                    <DataTable
                      columns={columns}
                      data={tableData}
                      searchPlaceholder={`Search ${feature.name}...`}
                      pageSize={5}
                    />
                  ) : (
                    <div className="text-sm text-gray-500 py-4 text-center">
                      No properties available
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
