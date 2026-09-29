import { useEffect, useRef } from "react";
declare const Cesium: any;

export default function FlashFloodOverlay({ viewer, polygonCoords, waterLevel, active }: any) {
  const entityRef = useRef<any>(null);

  useEffect(() => {
    if (!viewer || !active || !polygonCoords || polygonCoords.length < 3) {
      if (entityRef.current) {
        viewer?.entities.remove(entityRef.current);
        entityRef.current = null;
      }
      return;
    }

    const flatCoords = polygonCoords.flatMap((p: [number, number]) => [p[1], p[0]]);

    if (!entityRef.current) {
      entityRef.current = viewer.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(flatCoords),
          extrudedHeight: waterLevel,
          material: new Cesium.Color.fromBytes(0, 162, 255, 150),
          perPositionHeight: false
        }
      });
    } else {
      entityRef.current.polygon.extrudedHeight = waterLevel;
    }

  }, [viewer, polygonCoords, waterLevel, active]);

  return null;
}
