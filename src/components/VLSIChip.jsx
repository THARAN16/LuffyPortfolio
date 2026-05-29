import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Ember spark — ocean cyan data packets
function DataPacket({ path, speed = 1.2, color = '#38bdf8', delay = 0 }) {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (!meshRef.current) return;
        const t = ((state.clock.getElapsedTime() * speed) + delay) % 1;
        const p1 = path[0], p2 = path[1], p3 = path[2];
        let tx, ty, tz;
        if (t < 0.5) {
            const f = t * 2;
            tx = p1.x + (p2.x - p1.x) * f;
            ty = p1.y + (p2.y - p1.y) * f;
            tz = p1.z + (p2.z - p1.z) * f;
        } else {
            const f = (t - 0.5) * 2;
            tx = p2.x + (p3.x - p2.x) * f;
            ty = p2.y + (p3.y - p2.y) * f;
            tz = p2.z + (p3.z - p2.z) * f;
        }
        meshRef.current.position.set(tx, ty, tz);
        // Gentle pulse
        const pulse = 0.8 + Math.sin(state.clock.getElapsedTime() * 4 + delay) * 0.2;
        meshRef.current.scale.setScalar(pulse);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    );
}

// Aged copper circuit traces radiating from chip
function CircuitTraces() {
    const traces = useMemo(() => {
        const list = [];
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const p1 = new THREE.Vector3(cos * 1.5, -0.22, sin * 1.5);
            const p2 = new THREE.Vector3(cos * 2.3, -0.22, sin * 2.3);
            const p3 = new THREE.Vector3(cos * 3.6, -0.22, sin * 3.6 + (i % 2 === 0 ? 0.7 : -0.7));
            list.push({ points: [p1, p2, p3], id: i });
        }
        return list;
    }, []);

    return (
        <group>
            {traces.map((trace) => (
                <group key={trace.id}>
                    <line>
                        <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(trace.points)} />
                        <lineBasicMaterial
                            attach="material"
                            color={trace.id % 3 === 0 ? '#1e3a8a' : '#0f172a'}
                            linewidth={1}
                            transparent
                            opacity={0.55}
                        />
                    </line>
                    {trace.id % 2 === 0 && (
                        <DataPacket
                            path={trace.points}
                            speed={0.35 + (trace.id % 4) * 0.12}
                            delay={trace.id * 0.4}
                            color={trace.id % 6 === 0 ? '#7dd3fc' : '#38bdf8'}
                        />
                    )}
                </group>
            ))}
        </group>
    );
}

// Main 3D Microchip — Sekiro iron/bronze aesthetic
function ChipModel({ onSelectBlock, selectedBlock }) {
    const chipRef = useRef();
    const [hoveredBlock, setHoveredBlock] = useState(null);

    useFrame((state) => {
        if (chipRef.current) {
            chipRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
        }
    });

    // VLSI logic blocks — ocean night palette
    const blocks = [
        {
            id: 'ALU',
            label: 'ALU Block',
            pos: [-0.4, 0.12, -0.4],
            size: [0.65, 0.1, 0.65],
            color: '#38bdf8',
            emissive: '#0369a1',
        },
        {
            id: 'GATED_BUS',
            label: 'Clock Gate',
            pos: [0.4, 0.12, -0.4],
            size: [0.65, 0.1, 0.65],
            color: '#818cf8',
            emissive: '#4338ca',
        },
        {
            id: 'INTERFACE',
            label: 'I/O Bus',
            pos: [0, 0.12, 0.4],
            size: [1.45, 0.1, 0.65],
            color: '#7dd3fc',
            emissive: '#0284c7',
        }
    ];

    return (
        <group ref={chipRef} position={[0, 0.2, 0]}>
            {/* 1. Substrate — dark midnight silicon */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[3.2, 0.14, 3.2]} />
                <meshStandardMaterial
                    color="#0f172a"
                    roughness={0.8}
                    metalness={0.7}
                />
            </mesh>

            {/* Substrate edge — soft cyan bevel */}
            <mesh position={[0, 0.075, 0]}>
                <boxGeometry args={[3.25, 0.01, 3.25]} />
                <meshStandardMaterial
                    color="#1e3a8a"
                    roughness={0.4}
                    metalness={0.9}
                />
            </mesh>

            {/* 2. Ocean-cyan pins */}
            {useMemo(() => {
                const pins = [];
                for (let i = 0; i < 8; i++) {
                    const offset = -1.4 + (i * 0.4);
                    const pinMat = (
                        <meshStandardMaterial
                            color={i % 2 === 0 ? '#38bdf8' : '#818cf8'}
                            roughness={0.2}
                            metalness={0.95}
                        />
                    );
                    pins.push(<mesh key={`n-${i}`} position={[offset, -0.10, 1.46]}><cylinderGeometry args={[0.035, 0.035, 0.12, 6]} />{pinMat}</mesh>);
                    pins.push(<mesh key={`s-${i}`} position={[offset, -0.10, -1.46]}><cylinderGeometry args={[0.035, 0.035, 0.12, 6]} />{pinMat}</mesh>);
                    pins.push(<mesh key={`e-${i}`} position={[1.46, -0.10, offset]}><cylinderGeometry args={[0.035, 0.035, 0.12, 6]} />{pinMat}</mesh>);
                    pins.push(<mesh key={`w-${i}`} position={[-1.46, -0.10, offset]}><cylinderGeometry args={[0.035, 0.035, 0.12, 6]} />{pinMat}</mesh>);
                }
                return pins;
            }, [])}

            {/* 3. Silicon die — dark matte charcoal */}
            <mesh position={[0, 0.09, 0]}>
                <boxGeometry args={[1.62, 0.05, 1.62]} />
                <meshStandardMaterial
                    color="#231e18"
                    roughness={0.4}
                    metalness={0.7}
                />
            </mesh>

            {/* Die inset bevel — thin iron ring */}
            <mesh position={[0, 0.115, 0]}>
                <boxGeometry args={[1.65, 0.008, 1.65]} />
                <meshStandardMaterial color="#5a3c1a" roughness={0.3} metalness={0.9} />
            </mesh>

            {/* 4. Interactive logic blocks */}
            {blocks.map((block) => {
                const isSelected = selectedBlock === block.id;
                const isHovered = hoveredBlock === block.id;

                let blockColor = '#2a2018';
                let emissiveColor = '#000000';
                let emissiveInt = 0;
                let roughness = 0.5;
                let metalness = 0.8;

                if (isSelected) {
                    blockColor = block.color;
                    emissiveColor = block.emissive;
                    emissiveInt = 1.8;
                    roughness = 0.2;
                    metalness = 0.95;
                } else if (isHovered) {
                    blockColor = '#3d3020';
                    emissiveColor = block.emissive;
                    emissiveInt = 0.5;
                    roughness = 0.35;
                }

                return (
                    <mesh
                        key={block.id}
                        position={block.pos}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            setHoveredBlock(block.id);
                            document.body.style.cursor = 'pointer';
                        }}
                        onPointerOut={(e) => {
                            e.stopPropagation();
                            setHoveredBlock(null);
                            document.body.style.cursor = 'default';
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectBlock(block.id);
                        }}
                    >
                        <boxGeometry args={block.size} />
                        <meshStandardMaterial
                            color={blockColor}
                            roughness={roughness}
                            metalness={metalness}
                            emissive={emissiveColor}
                            emissiveIntensity={emissiveInt}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

// Scene — ocean night lighting
function Scene({ onSelectBlock, selectedBlock }) {
    return (
        <>
            {/* Soft ambient — moonlit night */}
            <ambientLight intensity={0.35} color="#1a2235" />

            {/* Main cyan overhead — ocean blossom glow */}
            <pointLight position={[0, 6, 2]} intensity={2.2} color="#38bdf8" castShadow />

            {/* Soft lilac side fill */}
            <pointLight position={[5, 3, -4]} intensity={1.0} color="#818cf8" />

            {/* Deep blue-violet rim — night sky */}
            <pointLight position={[-5, -1, -6]} intensity={0.5} color="#1e3a8a" />

            {/* Warm white top directional */}
            <directionalLight position={[2, 8, 4]} intensity={0.6} color="#f0f8ff" />

            {/* Ground grid — dark midnight */}
            <gridHelper args={[20, 20, '#0f172a', '#020617']} position={[0, -0.22, 0]} />

            <CircuitTraces />
            <ChipModel onSelectBlock={onSelectBlock} selectedBlock={selectedBlock} />

            <OrbitControls
                autoRotate={!selectedBlock}
                autoRotateSpeed={0.6}
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 4.5}
            />
        </>
    );
}

export default function VLSIChip({ onSelectBlock, selectedBlock }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 2.8, 4.5], fov: 48 }}
                gl={{ antialias: true, alpha: true }}
                onPointerMissed={() => onSelectBlock(null)}
            >
                <Scene onSelectBlock={onSelectBlock} selectedBlock={selectedBlock} />
            </Canvas>
        </div>
    );
}
