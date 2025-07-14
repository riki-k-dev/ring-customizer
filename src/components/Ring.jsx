import React, { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, MeshRefractionMaterial, useEnvironment } from "@react-three/drei"
import { useSnapshot } from "valtio"
import * as THREE from "three"
import state from "../state/state"

export default function Ring() {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("/ring.glb")
  const [hovered, set] = useState(null)
  const envMap = useEnvironment({ files: "env.hdr" })

  useEffect(() => {
    if (materials.s_ring) {
      materials.s_ring.metalness = 1
      materials.s_ring.roughness = 0.2
    }
    if (materials.b_ring) {
      materials.b_ring.metalness = 1
      materials.b_ring.roughness = 0.2
    }
  }, [materials])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" font-size="10"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered, snap.items])

  const diamondMaterial = (
    <MeshRefractionMaterial
      envMap={envMap}
      toneMapped={false}
      ior={1.33}
      bounces={2}
      aberrationStrength={0.02}
      fresnel={0.5}
      color={snap.items.gem}
    />
  )

  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation()
        const name = e.object.material.name
        if (name !== "diamonds.001") set(name === "b_ring" ? "inner" : name === "s_ring" ? "outer" : null)
      }}
      onPointerOut={(e) => {
        if (e.intersections.length === 0) set(null)
      }}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => {
        e.stopPropagation()
        const name = e.object.material.name
        if (name !== "diamonds.001") {
          state.current = name === "b_ring" ? "inner" : name === "s_ring" ? "outer" : null
        }
      }}
    >
      <mesh geometry={nodes.b_ring.geometry} material={materials.b_ring} material-color={snap.items.inner} />

      <mesh geometry={nodes.diamonds.geometry}>{diamondMaterial}</mesh>
      <mesh geometry={nodes.diamonds001.geometry}>{diamondMaterial}</mesh>
      <mesh geometry={nodes.diamonds002.geometry}>{diamondMaterial}</mesh>
      <mesh geometry={nodes.diamonds003.geometry}>{diamondMaterial}</mesh>
      <mesh geometry={nodes.diamonds004.geometry}>{diamondMaterial}</mesh>
      <mesh geometry={nodes.diamonds005.geometry}>{diamondMaterial}</mesh>

      <mesh geometry={nodes.s_ring.geometry} material={materials.s_ring} material-color={snap.items.outer} />
    </group>
  )
}