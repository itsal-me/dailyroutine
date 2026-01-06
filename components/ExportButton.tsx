"use client";

import { useState } from "react";
import { domToPng } from "modern-screenshot";
import { motion, AnimatePresence } from "framer-motion";

interface ExportButtonProps {
    canvasId: string;
    filename?: string;
}

export default function ExportButton({
    canvasId,
    filename = "my-routine-wallpaper",
}: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);
    const [exportError, setExportError] = useState("");

    const exportAsImage = async () => {
        setIsExporting(true);
        setExportSuccess(false);
        setExportError("");

        try {
            // Find the canvas element
            const canvasElement = document.getElementById(canvasId);

            if (!canvasElement) {
                console.error("Canvas element not found");
                setExportError("Could not find the routine canvas to export.");
                setIsExporting(false);
                return;
            }

            // Use modern-screenshot for clean export
            const dataUrl = await domToPng(canvasElement, {
                scale: 4, // 4x resolution for high quality
                quality: 1.0,
                backgroundColor: null,
                style: {
                    margin: "0",
                    padding: "0",
                },
            });

            // Convert dataUrl to blob
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const timestamp = new Date().toISOString().slice(0, 10);
            link.download = `${filename}-${timestamp}.png`;
            link.href = url;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            URL.revokeObjectURL(url);

            setIsExporting(false);
            setExportSuccess(true);

            // Reset success message after 3 seconds
            setTimeout(() => {
                setExportSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Export error:", error);
            setExportError(
                `An error occurred: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
            setIsExporting(false);
        }
    };

    return (
        <div className="space-y-4">
            <motion.button
                onClick={exportAsImage}
                disabled={isExporting}
                className={`
                    relative px-8 py-4 rounded-3xl font-bold text-lg w-full
                    transition-all duration-300
                    ${
                        exportSuccess
                            ? "bg-linear-to-r from-green-400 to-emerald-400 text-white"
                            : isExporting
                            ? "bg-gray-300 text-gray-600 cursor-wait"
                            : "bg-linear-to-r from-purple-400 to-pink-400 text-white hover:scale-105"
                    }
                    shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)]
                    hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,0.25)]
                    active:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]
                    active:translate-x-0.5 active:translate-y-0.5
                    border-4 border-white
                    disabled:hover:scale-100
                    disabled:hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)]
                `}
                whileTap={{ scale: isExporting ? 1 : 0.95 }}
            >
                <div className="flex items-center justify-center gap-3">
                    {isExporting ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                            />
                            <span>Exporting...</span>
                        </>
                    ) : exportSuccess ? (
                        <>
                            <span className="text-2xl">✓</span>
                            <span>Downloaded!</span>
                        </>
                    ) : (
                        <>
                            <span className="text-2xl">📥</span>
                            <span>Export Wallpaper</span>
                        </>
                    )}
                </div>

                {/* Decorative sparkles */}
                {exportSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-2 -right-2 text-2xl"
                    >
                        ✨
                    </motion.div>
                )}
            </motion.button>

            {/* Success Message */}
            <AnimatePresence>
                {exportSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-100 border-4 border-green-400 rounded-2xl p-4 text-center"
                    >
                        <div className="flex items-center justify-center gap-2 text-green-800">
                            <span className="text-2xl">🎉</span>
                            <p className="font-semibold">
                                Successfully exported! Check your downloads
                                folder.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
                {exportError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-100 border-4 border-red-400 rounded-2xl p-4"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div className="flex-1">
                                <p className="font-semibold text-red-800 mb-1">
                                    Export Failed
                                </p>
                                <p className="text-sm text-red-700">
                                    {exportError}
                                </p>
                                <button
                                    onClick={() => setExportError("")}
                                    className="mt-2 text-xs text-red-600 underline hover:text-red-800"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Utility function to export canvas programmatically
 * Can be called from anywhere in the app
 */
export async function exportCanvasToImage(
    canvasId: string,
    filename: string = "routine-wallpaper"
): Promise<boolean> {
    try {
        const canvasElement = document.getElementById(canvasId);

        if (!canvasElement) {
            throw new Error("Canvas element not found");
        }

        const scaleFactor = 4;
        const dataUrl = await domToPng(canvasElement, {
            scale: scaleFactor,
            quality: 1.0,
            backgroundColor: null,
            style: {
                margin: "0",
                padding: "0",
            },
        });

        const response = await fetch(dataUrl);
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `${filename}-${timestamp}.png`;
        link.href = url;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
        return true;
    } catch (error) {
        console.error("Export error:", error);
        return false;
    }
}
