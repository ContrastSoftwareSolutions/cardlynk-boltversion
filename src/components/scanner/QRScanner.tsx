import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Camera, AlertCircle } from 'lucide-react';
import { decodeQRCode } from '../../utils/qrCodeScanner';

interface QRScannerProps {
  onScan: (data: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invalidQR, setInvalidQR] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrame: number;
    let isScanning = true;

    const startScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });

        if (videoRef.current && isScanning) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsLoading(false);
          scanQRCode();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera. Please make sure you have granted camera permissions.');
        setIsLoading(false);
      }
    };

    const scanQRCode = () => {
      if (!isScanning) return;
      
      if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          
          try {
            const code = decodeQRCode(imageData);
            if (code) {
              if (code.startsWith('https://cardlynk.app/p/')) {
                setInvalidQR(false);
                onScan(code);
                return;
              } else {
                setInvalidQR(true);
                // Continue scanning after a delay
                setTimeout(() => setInvalidQR(false), 3000);
              }
            }
          } catch (err) {
            console.error('QR decode error:', err);
          }
        }
      }
      
      animationFrame = requestAnimationFrame(scanQRCode);
    };

    startScanner();

    return () => {
      isScanning = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [onScan]);

  return (
    <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
      />
      <canvas 
        ref={canvasRef}
        className="hidden"
      />
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Camera className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="text-white text-center">
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Invalid QR Code Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: invalidQR ? 1 : 0, y: invalidQR ? 0 : 20 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-black/75"
      >
        <div className="flex items-center gap-2 text-white">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <p className="text-sm">
            Oops! Please scan a CardLynk QR code to save a contact.
          </p>
        </div>
      </motion.div>
      
      {/* Scanning Overlay */}
      {!isLoading && !error && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0">
            {/* Scanner Frame */}
            <div className="absolute inset-0 border-2 border-white/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white">
              <div className="absolute -inset-1">
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white" />
              </div>
            </div>
          </div>
          <Scan className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white/70" />
        </motion.div>
      )}
    </div>
  );
}