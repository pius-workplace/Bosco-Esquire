import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Lightformer, ContactShadows, Float } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { asset } from '../lib/asset'

// Draws the Bosco honey label (yellow band, black type, real logo) onto a canvas texture.
function useLabelTexture(size: string) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null)
  useEffect(() => {
    const c = document.createElement('canvas'); c.width = 2048; c.height = 640
    const g = c.getContext('2d')!
    const draw = (logo?: HTMLImageElement) => {
      g.fillStyle = '#F2B90F'; g.fillRect(0, 0, c.width, c.height)
      g.fillStyle = '#1A1A1A'; g.fillRect(0, 0, c.width, 34); g.fillRect(0, c.height - 34, c.width, 34)
      for (let i = 0; i < 2; i++) {
        const cx = 512 + i * 1024
        g.fillStyle = '#1A1A1A'; g.beginPath(); g.arc(cx, 320, 200, 0, Math.PI * 2); g.fill()
        if (logo) g.drawImage(logo, cx - 180, 140, 360, 360)
        g.fillStyle = '#1A1A1A'; g.textAlign = 'center'
        g.font = '800 66px "Bricolage Grotesque", sans-serif'; g.fillText('BOSCO ESQUIRE', cx, 110)
      }
      g.textAlign = 'left'; g.fillStyle = '#1A1A1A'
      g.font = '800 110px "Bricolage Grotesque", sans-serif'; g.fillText('RAW', 760, 300); g.fillText('HONEY', 760, 410)
      g.font = '600 46px "Open Sans", sans-serif'; g.fillText('From Kenyan hives · ' + size, 760, 490)
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.wrapS = THREE.RepeatWrapping; t.offset.x = 0.47; setTex(t)
    }
    const img = new Image(); img.onload = () => draw(img); img.onerror = () => draw(); img.src = asset('img/logo.png')
  }, [size])
  return tex
}

function useLogoTexture() {
  return useMemo(() => { const t = new THREE.TextureLoader().load(asset('img/logo.png')); t.colorSpace = THREE.SRGBColorSpace; return t }, [])
}

function Jar({ size }: { size: string }) {
  const label = useLabelTexture(size)
  const logo = useLogoTexture()
  return (
    <group position={[0, -0.2, 0]}>
      {/* honey body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 2.3, 96]} />
        <meshPhysicalMaterial color="#E8A21E" roughness={0.12} transmission={0.6} thickness={2} ior={1.5} clearcoat={1} attenuationColor="#7a3f06" attenuationDistance={1.2} />
      </mesh>
      {/* glass shell */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.04, 1.04, 2.5, 96, 1, true]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.05} transmission={1} thickness={0.1} ior={1.45} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* label */}
      {label && <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.055, 1.055, 1.2, 96, 1, true]} />
        <meshStandardMaterial map={label} roughness={0.55} side={THREE.FrontSide} />
      </mesh>}
      {/* neck + gold lid */}
      <mesh position={[0, 1.35, 0]}><cylinderGeometry args={[0.92, 0.98, 0.2, 96]} /><meshPhysicalMaterial color="#ffffff" transmission={1} roughness={0.05} transparent opacity={0.4} /></mesh>
      <mesh position={[0, 1.62, 0]}><cylinderGeometry args={[1.02, 1.02, 0.42, 96]} /><meshStandardMaterial color="#D9A21B" metalness={1} roughness={0.22} /></mesh>
      <mesh position={[0, 1.835, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.7, 64]} /><meshStandardMaterial map={logo} metalness={0.3} roughness={0.4} /></mesh>
      {[...Array(36)].map((_, i) => <mesh key={i} position={[Math.cos(i / 36 * Math.PI * 2) * 1.025, 1.62, Math.sin(i / 36 * Math.PI * 2) * 1.025]} rotation={[0, -i / 36 * Math.PI * 2, 0]}><boxGeometry args={[0.02, 0.38, 0.03]} /><meshStandardMaterial color="#B8860B" metalness={1} roughness={0.3} /></mesh>)}
    </group>
  )
}

function Responsive() {
  const { camera, size } = useThree()
  useEffect(() => { (camera as THREE.PerspectiveCamera).position.z = size.width < 640 ? 10.5 : 8.6; camera.updateProjectionMatrix() }, [size.width, camera])
  return null
}

export default function Jar3D({ size = '500 g', autoRotate = true }: { size?: string; autoRotate?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0.8, 8.6], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Responsive />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} color="#fff3d6" />
      <directionalLight position={[-5, 2, -3]} intensity={1.2} color="#FFA500" />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <Jar size={size} />
      </Float>
      <ContactShadows position={[0, -1.75, 0]} opacity={0.45} scale={8} blur={2.6} far={3} color="#2B2416" />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, -6]} scale={[10, 4, 1]} color="#fff2d9" />
        <Lightformer intensity={2} position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#FFA500" />
        <Lightformer intensity={2} position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#ffffff" />
      </Environment>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={1.6} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 1.8} />
    </Canvas>
  )
}
