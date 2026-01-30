import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load heavy dependencies
const Scene = lazy(() => import('../three/Scene'));
const HandModel = lazy(() => import('../three/HandModel'));

// Dynamic imports for MediaPipe to prevent crashes
let Hands: any = null;
let Camera: any = null;

interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export default function Practice() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [detectedMudra, setDetectedMudra] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  // Load MediaPipe dynamically
  useEffect(() => {
    const loadMediaPipe = async () => {
      try {
        setIsLoading(true);
        const [{ Hands: HandsModule }, { Camera: CameraModule }] = await Promise.all([
          import('@mediapipe/hands'),
          import('@mediapipe/camera_utils'),
        ]);
        Hands = HandsModule;
        Camera = CameraModule;
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load MediaPipe:', err);
        setError('Failed to load hand tracking. Please refresh the page.');
        setIsLoading(false);
      }
    };

    loadMediaPipe();
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !Hands || !Camera || isLoading) return;
    if (!isActive) return;

    try {
      const hands = new Hands({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: any) => {
        if (canvasRef.current && videoRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (!ctx) return;

          ctx.save();
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            
            ctx.strokeStyle = '#FFA000';
            ctx.lineWidth = 2;
            ctx.fillStyle = '#B8860B';

            const connections = [
              [0, 1], [1, 2], [2, 3], [3, 4],
              [0, 5], [5, 6], [6, 7], [7, 8],
              [5, 9], [9, 10], [10, 11], [11, 12],
              [9, 13], [13, 14], [14, 15], [15, 16],
              [13, 17], [17, 18], [18, 19], [19, 20],
              [0, 17],
            ];

            connections.forEach(([start, end]) => {
              const startPoint = landmarks[start];
              const endPoint = landmarks[end];
              ctx.beginPath();
              ctx.moveTo(startPoint.x * canvasRef.current!.width, startPoint.y * canvasRef.current!.height);
              ctx.lineTo(endPoint.x * canvasRef.current!.width, endPoint.y * canvasRef.current!.height);
              ctx.stroke();
            });

            landmarks.forEach((landmark: HandLandmark) => {
              ctx.beginPath();
              ctx.arc(
                landmark.x * canvasRef.current!.width,
                landmark.y * canvasRef.current!.height,
                4,
                0,
                2 * Math.PI
              );
              ctx.fill();
            });

            detectMudra(landmarks);
          }

          ctx.restore();
        }
      });

      handsRef.current = hands;

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && handsRef.current) {
            try {
              await handsRef.current.send({ image: videoRef.current });
            } catch (err) {
              console.error('Error sending frame:', err);
            }
          }
        },
        width: 640,
        height: 480,
      });

      cameraRef.current = camera;

      // Request camera permission
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            camera.start();
          }
        })
        .catch((err) => {
          console.error('Camera access denied:', err);
          setError('Camera access is required. Please allow camera permissions.');
          setIsActive(false);
        });

    } catch (err) {
      console.error('Error initializing hand tracking:', err);
      setError('Failed to initialize hand tracking.');
      setIsActive(false);
    }

    return () => {
      if (cameraRef.current) {
        try {
          cameraRef.current.stop();
        } catch (err) {
          console.error('Error stopping camera:', err);
        }
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      if (handsRef.current) {
        try {
          handsRef.current.close();
        } catch (err) {
          console.error('Error closing hands:', err);
        }
      }
    };
  }, [isActive, isLoading]);

  const detectMudra = (landmarks: HandLandmark[]) => {
    const thumbUp = landmarks[4].y < landmarks[3].y;
    const indexUp = landmarks[8].y < landmarks[6].y;
    const middleUp = landmarks[12].y < landmarks[10].y;
    const ringUp = landmarks[16].y < landmarks[14].y;
    const pinkyUp = landmarks[20].y < landmarks[18].y;

    if (thumbUp && !indexUp && !middleUp && !ringUp && !pinkyUp) {
      setDetectedMudra('Abhaya Mudra');
      setAccuracy(85);
    } else if (!thumbUp && indexUp && middleUp && !ringUp && !pinkyUp) {
      setDetectedMudra('Chin Mudra');
      setAccuracy(90);
    } else if (thumbUp && indexUp && middleUp && ringUp && pinkyUp) {
      setDetectedMudra('Anjali Mudra');
      setAccuracy(95);
    } else {
      setDetectedMudra(null);
      setAccuracy(0);
    }
  };

  const togglePractice = async () => {
    if (!Hands || !Camera) {
      setError('Hand tracking is still loading. Please wait...');
      return;
    }

    if (!isActive) {
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera is not available on this device.');
        return;
      }
    }

    setIsActive(!isActive);
    setError(null);
  };

  return (
    <div className="relative min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-bold mb-4 md:mb-6 text-gradient px-4">
            Practice Mudras
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Use your webcam to practice mudras in real-time with AI-powered feedback
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 glass-strong rounded-2xl p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="glass-strong rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
            <div className="relative aspect-video bg-dark-400 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                style={{ transform: 'scaleX(-1)' }}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0"
                width={640}
                height={480}
                style={{ transform: 'scaleX(-1)' }}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">Loading hand tracking...</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={togglePractice}
              disabled={isLoading}
              className={`w-full py-3 md:py-4 rounded-full font-medium text-base md:text-lg transition-all shadow-sm ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed opacity-50 text-gray-600'
                  : isActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-saffron-500 hover:bg-saffron-600 text-white'
              }`}
            >
              {isLoading ? 'Loading...' : isActive ? 'Stop Practice' : 'Start Practice'}
            </button>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-display font-bold mb-4 text-saffron-600">
                Detected Mudra
              </h2>
              <AnimatePresence mode="wait">
                {detectedMudra ? (
                  <motion.div
                    key={detectedMudra}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-600 mb-2"
                  >
                    {detectedMudra}
                  </motion.div>
                ) : (
                  <div className="text-lg sm:text-xl md:text-2xl text-gray-500">
                    No mudra detected
                  </div>
                )}
              </AnimatePresence>
              {accuracy > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2 text-gray-700">
                    <span>Accuracy</span>
                    <span>{accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${accuracy}%` }}
                      className="bg-gradient-to-r from-saffron-500 to-gold-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8 hidden md:block">
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-900">3D Preview</h3>
              <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-saffron-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }>
                  <Scene enableEffects={true} enableParticles={false} enableHand={true}>
                    <HandModel />
                  </Scene>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

