import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";

import "./HeroScene.scss";


const TorusKnot = () => {
    const meshRef = useRef(null);

    const mouse = useRef({
        x: 0,
        y: 0,
    });

    useFrame((state) => {
        if (!meshRef.current) return;

        mouse.current.x = state.pointer.x;
        mouse.current.y = state.pointer.y;

        // Slow continuous rotation
        meshRef.current.rotation.x += 0.004;
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.z += 0.002;

        // Mouse interaction
        meshRef.current.rotation.x +=
            (mouse.current.y * 0.15 - meshRef.current.rotation.x) * 0.01;

        meshRef.current.rotation.y +=
            (mouse.current.x * 0.2 - meshRef.current.rotation.y) * 0.01;
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.3}
            floatIntensity={1}
        >
            <mesh
                ref={meshRef}
                scale={1.05}
            >
                <torusKnotGeometry
                    args={[1.6, 0.42, 180, 32, 2, 3]}
                />

                <meshStandardMaterial
                    color="#2997ff"
                    emissive="#0b4f9c"
                    emissiveIntensity={1.5}
                    metalness={0.85}
                    roughness={0.2}
                    wireframe
                />
            </mesh>
        </Float>
    );
};


const HeroScene = ({ sceneRef }) => {
    return (
        <div
            ref={sceneRef}
            className="hero-scene"
        >
            <Canvas
                camera={{
                    position: [0, 0, 8],
                    fov: 45,
                }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                }}
            >

                <ambientLight intensity={0.4} />

                <directionalLight
                    position={[4, 4, 5]}
                    intensity={2}
                />

                <pointLight
                    position={[-3, 1, 3]}
                    intensity={15}
                    distance={10}   
                    color="#2997ff"
                />

                <Environment preset="city" />

                <TorusKnot />

            </Canvas>
        </div>
    );
};

export default HeroScene;