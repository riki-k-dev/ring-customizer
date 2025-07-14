import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import Ring from "./components/Ring"
import Picker from "./components/Picker"

export default function App() {
  return (
    <>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.7] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
          <Ring />
          <Environment files="env.hdr" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={2}
            width={10}
            height={10}
            blur={0.4}
            far={0.9}
          />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}