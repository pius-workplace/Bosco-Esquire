import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "../lib/asset";

// Panoramic viewer. Swap PANO for the real equirectangular 360° photo of the Imaara Mall shop
// (2:1 image from an Insta360, Ricoh Theta or a phone's panorama mode) and update the hotspots' u values.
const PANO = "img/tour-preview.jpg";
import { hotspots } from "../data/tour";

function Room({ showSpots }: { showSpots: boolean }) {
  const tex = useLoader(THREE.TextureLoader, asset(PANO));
  tex.colorSpace = THREE.SRGBColorSpace;
  const R = 50;
  return (
    <>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[R, 64, 40]} />
        <meshBasicMaterial map={tex} side={THREE.BackSide} />
      </mesh>
      {showSpots &&
        hotspots.map((h) => {
          const a = (0.5 - h.u) * Math.PI * 2;
          return (
            <Html
              key={h.label}
              position={[-Math.cos(a) * R * 0.8, -6, Math.sin(a) * R * 0.8]}
              center
              zIndexRange={[20, 0]}
            >
              {/* Html renders outside the router tree, so use a plain hash link */}
              <a
                href={"#" + h.to}
                className="group flex items-center gap-2 whitespace-nowrap"
              >
                <span className="relative grid place-items-center w-10 h-10 rounded-full bg-amber text-cocoa font-bold shadow-xl">
                  <span className="absolute inset-0 rounded-full bg-amber animate-ping opacity-60" />
                  +
                </span>
                <span className="bg-white text-ink text-sm font-bold px-3 py-1.5 rounded-full shadow-lg opacity-90 group-hover:opacity-100">
                  {h.label}
                </span>
              </a>
            </Html>
          );
        })}
    </>
  );
}

export default function Tour360({
  showSpots = true,
  autoRotate = true,
}: {
  showSpots?: boolean;
  autoRotate?: boolean;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }} dpr={[1, 2]}>
      <Room showSpots={showSpots} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.35}
        autoRotate={autoRotate}
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
