import { EffectComposer, Bloom, ChromaticAberration, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

export default function Effects() {

  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
        height={300}
      />
      <ChromaticAberration
        offset={new Vector2(0.001, 0.001)}
        radialModulation={false}
        modulationOffset={0.15}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
    </EffectComposer>
  );
}

