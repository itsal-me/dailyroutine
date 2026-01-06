"use client";

import { motion } from "framer-motion";

interface RoutineBlockProps {
    time: string;
    activity: string;
    color?: string;
    icon?: string;
}

export default function RoutineBlock({
    time,
    activity,
    color = "#FFB6C1",
    icon = "✨",
}: RoutineBlockProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
        >
            {/* Washi Tape Effect */}
            <div
                className="relative py-4 px-6 my-3 washi-tape"
                style={{
                    backgroundColor: color,
                    opacity: 0.85,
                }}
            >
                {/* Jagged Edges using clip-path */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        clipPath: `polygon(
                            0% 5px,
                            5px 0%,
                            calc(100% - 5px) 0%,
                            100% 5px,
                            100% calc(100% - 5px),
                            calc(100% - 5px) 100%,
                            5px 100%,
                            0% calc(100% - 5px)
                        )`,
                        background: "inherit",
                    }}
                />

                {/* Content */}
                <div className="relative flex flex-col items-center text-center gap-2 z-10">
                    <span className="text-3xl shrink-0">{icon}</span>
                    <div className="flex-1">
                        <div className="text-xs font-bold text-gray-700 opacity-80">
                            {time}
                        </div>
                        <div className="text-sm font-semibold text-gray-800 line-clamp-2">
                            {activity}
                        </div>
                    </div>
                </div>

                {/* Tape texture overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(255, 255, 255, 0.3) 2px,
                            rgba(255, 255, 255, 0.3) 4px
                        )`,
                    }}
                />
            </div>

            {/* Shadow effect below tape */}
            <div
                className="absolute bottom-0 left-4 right-4 h-2 -z-10 blur-sm"
                style={{
                    background: "rgba(0, 0, 0, 0.15)",
                    transform: "translateY(4px)",
                }}
            />
        </motion.div>
    );
}
