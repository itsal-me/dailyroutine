"use client";

import { motion } from "framer-motion";
import { useTheme, type ThemeName } from "@/contexts/ThemeContext";

interface ThemeButton {
    name: ThemeName;
    label: string;
    emoji: string;
    color: string;
    gradient: string;
}

const themeButtons: ThemeButton[] = [
    {
        name: "strawberry",
        label: "Strawberry",
        emoji: "🍓",
        color: "#FFB6C1",
        gradient: "from-pink-300 to-pink-400",
    },
    {
        name: "matcha",
        label: "Matcha",
        emoji: "🍵",
        color: "#81C784",
        gradient: "from-green-300 to-green-400",
    },
    {
        name: "blueberry",
        label: "Blueberry",
        emoji: "🫐",
        color: "#9FA8DA",
        gradient: "from-blue-300 to-blue-400",
    },
];

export default function ThemeSwitcher() {
    const { currentTheme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700 mr-2">
                Theme:
            </span>
            <div className="flex gap-2">
                {themeButtons.map((theme) => (
                    <motion.button
                        key={theme.name}
                        onClick={() => setTheme(theme.name)}
                        className={`relative w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                            currentTheme === theme.name
                                ? "border-white shadow-[0_0_0_3px_rgba(0,0,0,0.2)] scale-110"
                                : "border-white/50 hover:scale-105"
                        }`}
                        style={{ backgroundColor: theme.color }}
                        whileHover={{
                            scale: currentTheme === theme.name ? 1.1 : 1.15,
                        }}
                        whileTap={{ scale: 0.95 }}
                        title={theme.label}
                    >
                        <span className="text-2xl">{theme.emoji}</span>
                        {currentTheme === theme.name && (
                            <motion.div
                                layoutId="activeTheme"
                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
