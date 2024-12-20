import React, { useState, useRef } from 'react';
import { Camera, RotateCcw, Loader2, QrCode, X, ArrowLeft } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { motion, AnimatePresence } from 'framer-motion';
import { QRScanner } from './QRScanner';
import { extractContactInfo } from '../../utils/contactExtractor';
import { isCardLynkQR, extractUserIdFromQR } from '../../utils/qrCodeScanner';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { Contact } from '../../types';

interface BusinessCardScannerProps {
  onScanComplete: (contact: Partial<Contact>) => void;
  onClose: () => void;
}

export function BusinessCardScanner({ onScanComplete, onClose }: BusinessCardScannerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mode, setMode] = useState<'card' | 'qr'>('qr');
  const [isScanning, setIsScanning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedInfo, setExtractedInfo] = useState<Partial<Contact> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setPreviewUrl(imageUrl);
        stopCamera();
        processImage(imageUrl);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setPreviewUrl(imageUrl);
        processImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageUrl: string) => {
    setIsScanning(true);
    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imageUrl);
      await worker.terminate();

      const contactInfo = extractContactInfo(text);
      setExtractedInfo(contactInfo);
    } catch (error) {
      console.error('OCR error:', error);
    }
    setIsScanning(false);
  };

  const handleQRScan = async (data: string) => {
    if (isCardLynkQR(data)) {
      const userId = extractUserIdFromQR(data);
      if (userId) {
        // In a real app, fetch user profile from API
        const mockCardLynkContact: Partial<Contact> = {
          name: "CardLynk User",
          email: "user@cardlynk.app",
          phone: "+1 (555) 123-4567",
          title: "Software Engineer",
          company: "Tech Corp",
          tags: ["CardLynk"]
        };
        onScanComplete(mockCardLynkContact);
      }
    }
  };

  const handleRetake = () => {
    setPreviewUrl(null);
    setExtractedInfo(null);
    if (mode === 'card') {
      startCamera();
    }
  };

  const handleSave = () => {
    if (extractedInfo) {
      onScanComplete(extractedInfo);
    }
  };

  React.useEffect(() => {
    if (mode === 'card') {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mode]);

  const containerClass = isMobile 
    ? "fixed inset-0 bg-black z-50" 
    : "fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4";

  const contentClass = isMobile
    ? "h-full"
    : "bg-white rounded-lg w-full max-w-md overflow-hidden";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={containerClass}
      >
        <div className={contentClass}>
          {/* Header */}
          <div className="bg-black sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={onClose}
                className="p-2 -ml-2 text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 bg-white/10 p-1 rounded-lg">
                <button
                  onClick={() => setMode('qr')}
                  className={`p-2 rounded-lg transition-colors ${
                    mode === 'qr' ? 'bg-white text-black' : 'text-white'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setMode('card')}
                  className={`p-2 rounded-lg transition-colors ${
                    mode === 'card' ? 'bg-white text-black' : 'text-white'
                  }`}
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="w-9" /> {/* Spacer */}
            </div>
          </div>

          <div className="h-full">
            {mode === 'qr' ? (
              <QRScanner onScan={handleQRScan} />
            ) : (
              <>
                <div className="aspect-[4/3] bg-black relative">
                  {!previewUrl ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 border-2 border-white/30">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                        <p>Scanning business card...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-black">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {!previewUrl ? (
                    <>
                      <button
                        onClick={captureImage}
                        className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium mb-3"
                      >
                        Capture
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-3 px-4 bg-white/10 text-white rounded-lg"
                      >
                        Upload
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleRetake}
                        className="flex-1 py-3 px-4 bg-white/10 text-white rounded-lg"
                      >
                        Retake
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={!extractedInfo}
                        className="flex-1 py-3 px-4 bg-white text-black rounded-lg font-medium disabled:opacity-50"
                      >
                        Save Contact
                      </button>
                    </div>
                  )}
                </div>

                {/* Extracted Info Preview */}
                {extractedInfo && (
                  <div className="p-4 bg-black">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-white mb-2">
                        Extracted Information
                      </h3>
                      <dl className="space-y-1">
                        {Object.entries(extractedInfo).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <dt className="inline font-medium text-white/70 capitalize">
                              {key}:
                            </dt>
                            <dd className="inline ml-1 text-white">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}