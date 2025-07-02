import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { motion } from 'framer-motion';
import './FbxViewer.css';

const FbxViewer = () => {
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFbx = async () => {
            try {
                const response = await fetch('https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/Show1.fbx');
                if (!response.ok) throw new Error('Failed to load FBX');
                const buffer = await response.arrayBuffer();
                const loader = new FBXLoader();
                const object = loader.parse(buffer);
                setModel(object);
                console.log('Model loaded:', object);  // 查看模型是否加载成功
                setLoading(false);
            } catch (error) {
                console.error('Error loading FBX:', error);
            }
        };

        fetchFbx();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            className="fbx-container"
            style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {/* Adjust position and scale */}
                <primitive object={model} position={[0, 0, 0]} scale={[1, 1, 1]} />
            </Canvas>
        </motion.div>
    );
};

export default FbxViewer;
