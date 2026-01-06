"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface RoutineTaskProps {
    taskName: string;
    time: string;
    isCompleted: boolean;
    onToggle: () => void;
    categoryIcon?: string;
}

export default function RoutineTask({
    taskName,
    time,
    isCompleted,
    onToggle,
    categoryIcon = "✨",
}: RoutineTaskProps) {
    const [showSparkle, setShowSparkle] = useState(false);

    const handleToggle = () => {
        if (!isCompleted) {
            setShowSparkle(true);
            setTimeout(() => setShowSparkle(false), 1000);
        }
        onToggle();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
            <div
                className={`
          rounded-3xl border-4 p-6
          shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]
          transition-all duration-300
          ${
              isCompleted
                  ? "border-green-300 bg-green-50/80"
                  : "border-pink-300 bg-white/80"
          }
          backdrop-blur-sm
          hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.15)]
          hover:translate-x-[-2px] hover:translate-y-[-2px]
        `}
            >
                <div className="flex items-center gap-4">
                    {/* Custom checkbox */}
                    <button
                        onClick={handleToggle}
                        className="relative flex-shrink-0 w-8 h-8 group"
                    >
                        <div
                            className={`
                w-full h-full rounded-full border-4 
                transition-all duration-300
                ${
                    isCompleted
                        ? "border-green-400 bg-green-400"
                        : "border-purple-400 bg-white"
                }
                group-hover:scale-110
              `}
                            style={{
                                borderRadius:
                                    "48% 52% 47% 53% / 52% 48% 52% 48%",
                            }}
                        >
                            {isCompleted && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 15,
                                    }}
                                    className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold"
                                >
                                    ✓
                                </motion.div>
                            )}
                        </div>
                    </button>

                    {/* Task content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{categoryIcon}</span>
                            <h3
                                className={`text-xl font-semibold ${
                                    isCompleted
                                        ? "text-gray-500 line-through"
                                        : "text-gray-800"
                                }`}
                            >
                                {taskName}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{time}</p>
                    </div>
                </div>
            </div>

            {/* Confetti/Sparkle animation */}
            {showSparkle && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: "50%",
                                y: "50%",
                                scale: 0,
                                opacity: 1,
                            }}
                            animate={{
                                x: `${
                                    50 + Math.cos((i * Math.PI * 2) / 8) * 100
                                }%`,
                                y: `${
                                    50 + Math.sin((i * Math.PI * 2) / 8) * 100
                                }%`,
                                scale: [0, 1, 0],
                                opacity: [1, 1, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            className="absolute text-2xl"
                        >
                            ✨
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
