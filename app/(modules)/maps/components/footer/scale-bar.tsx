"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapAtom } from "../../state/map";

const ScaleBar: React.FC = () => {
  const map = useAtomValue(mapAtom);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [label, setLabel] = useState<string>("");
  const [barStyle, setBarStyle] = useState<object>({});

  useEffect(() => {
    setBarStyle({
      width: barWidth + "px",
      left: 5 + (125 - barWidth) / 2 + "px",
      height: "2px",
    });
  }, [barWidth]);

  const getRoundNumMeter = (meters: number): number => {
    const roundNumbers = [
      1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000,
      100000, 200000, 500000, 1000000,
    ];
    for (const num of roundNumbers) {
      if (meters <= num) return num;
    }
    return 1000000;
  };

  const updateScaleBar = () => {
    if (!map) return;

    const halfHeight = map.getSize().y / 2;
    const maxPixelWidth = 100;
    const maxMeters = map
      .containerPointToLatLng([0, halfHeight])
      .distanceTo(map.containerPointToLatLng([maxPixelWidth, halfHeight]));
    const meters = getRoundNumMeter(maxMeters);
    const label = meters < 1000 ? `${meters} m` : `${meters / 1000} km`;

    setBarWidth((meters / maxMeters) * maxPixelWidth);
    setLabel(label);
  };

  useEffect(() => {
    if (map) {
      updateScaleBar();
      map.on("zoomend", updateScaleBar);
      map.on("moveend", updateScaleBar);

      return () => {
        map.off("zoomend", updateScaleBar);
        map.off("moveend", updateScaleBar);
      };
    }
  }, [map]);

  return (
    <div aria-label="ScaleBar" className="w-[250px] text-center">
      <label className="mb-2 block text-xs">{label}</label>
      <div
        className="mx-auto my-0 block bg-zinc-400 transition-all duration-500 ease-in-out dark:bg-white"
        style={barStyle}
      />
    </div>
  );
};

export default ScaleBar;
