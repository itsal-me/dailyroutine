"use client";

import { motion } from "framer-motion";
import RoutineBlock from "./RoutineBlock";
import { Template } from "@/lib/templates";

interface RoutineItem {
    id: string;
    time: string;
    activity: string;
    color?: string;
    icon?: string;
}

interface RoutineCanvasProps {
    routineItems?: RoutineItem[];
    title?: string;
    canvasId?: string;
    template?: Template; // Template for styling
}

const defaultRoutineItems: RoutineItem[] = [
    {
        id: "1",
        time: "6:00 AM",
        activity: "Morning Meditation",
        color: "#FFD1DC",
        icon: "🌅",
    },
    {
        id: "2",
        time: "7:00 AM",
        activity: "Breakfast & Journal",
        color: "#E0F2F1",
        icon: "☕",
    },
    {
        id: "3",
        time: "8:30 AM",
        activity: "Study Session",
        color: "#E6E6FA",
        icon: "📚",
    },
    {
        id: "4",
        time: "12:00 PM",
        activity: "Lunch Break",
        color: "#FFE4E1",
        icon: "🍱",
    },
    {
        id: "5",
        time: "2:00 PM",
        activity: "Creative Work",
        color: "#FFDAB9",
        icon: "🎨",
    },
];

export default function RoutineCanvas({
    routineItems = defaultRoutineItems,
    title = "My Daily Routine",
    canvasId = "routine-canvas",
    template,
}: RoutineCanvasProps) {
    // Apply template background if provided
    const paperStyle = template
        ? { backgroundColor: template.background.paperColor }
        : {};

    const titleStyle = template
        ? {
              fontFamily: template.fonts.title,
              color: template.accentColor,
          }
        : {};

    return (
        <div className="flex justify-center items-center p-4">
            {/* 9:16 Aspect Ratio Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
                style={{
                    aspectRatio: "9/16",
                }}
            >
                <div
                    id={canvasId}
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                        background: template?.background.gradient,
                        boxShadow: "8px 8px 0px 0px rgba(0,0,0,0.1)",
                    }}
                >
                    {/* Paper Background */}
                    <div className="absolute inset-0">
                        {/* Paper texture */}
                        <div
                            className="absolute inset-0"
                            style={{
                                ...paperStyle,
                                backgroundImage: `
                                    radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                                radial-gradient(circle at 60% 80%, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                                radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
                            `,
                                backgroundSize:
                                    "100px 100px, 120px 120px, 90px 90px",
                            }}
                        />

                        {/* Subtle paper grain */}
                        <div
                            className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative h-full overflow-y-auto p-8 flex flex-col">
                        {/* Title */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <h2
                                className="text-3xl font-bold mb-2"
                                style={titleStyle}
                            >
                                {title}
                            </h2>
                            <div
                                className="w-20 h-1 mx-auto rounded-full"
                                style={{
                                    background: template
                                        ? `linear-gradient(to right, ${template.blockColors[0]}, ${template.blockColors[2]}, ${template.blockColors[4]})`
                                        : "linear-gradient(to right, #FFC0CB, #E6E6FA, #87CEEB)",
                                }}
                            />
                        </motion.div>

                        {/* Routine Blocks */}
                        <div className="flex-1 space-y-2">
                            {routineItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <RoutineBlock
                                        time={item.time}
                                        activity={item.activity}
                                        color={item.color}
                                        icon={item.icon}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-center mt-6 text-sm text-gray-500"
                        >
                            <div className="flex justify-center gap-2 text-2xl">
                                ✨ 🌸 💫 🦋 ✨
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
