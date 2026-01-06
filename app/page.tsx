"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RoutineCanvas from "@/components/RoutineCanvas";
import ExportButton from "@/components/ExportButton";
import { getTemplateOptions, getTemplateById } from "@/lib/templates";

export default function Home() {
    const [selectedTemplate, setSelectedTemplate] = useState("strawberry-milk");
    const [routineItems, setRoutineItems] = useState([
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
    ]);

    const [newTime, setNewTime] = useState("");
    const [newActivity, setNewActivity] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const templates = getTemplateOptions();
    const currentTemplate = getTemplateById(selectedTemplate);

    const addRoutineItem = () => {
        if (!newTime.trim() || !newActivity.trim()) return;

        // Convert 24-hour format to 12-hour format with AM/PM
        const formatTime = (time: string) => {
            const [hours, minutes] = time.split(":");
            const hour = parseInt(hours);
            const period = hour >= 12 ? "PM" : "AM";
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minutes} ${period}`;
        };

        const colors = currentTemplate?.blockColors || [
            "#FFD1DC",
            "#E0F2F1",
            "#E6E6FA",
            "#FFE4E1",
            "#FFDAB9",
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newItem = {
            id: Date.now().toString(),
            time: formatTime(newTime),
            activity: newActivity,
            color: randomColor,
            icon: "✨",
        };

        setRoutineItems([...routineItems, newItem]);
        setNewTime("");
        setNewActivity("");
        setShowAddForm(false);
    };

    const deleteRoutineItem = (id: string) => {
        setRoutineItems(routineItems.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-5xl font-bold themed-primary mb-4">
                        Kawaii Routine Designer ✨
                    </h1>
                    <p className="text-lg text-gray-600">
                        Create beautiful routine posters for your phone
                        wallpaper
                    </p>
                </motion.div>

                {/* Template Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 text-center"
                >
                    <div className="inline-flex flex-wrap gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-3xl border-4 border-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                className={`px-6 py-3 rounded-2xl border-3 hover:scale-105 transition-transform shadow-md hover:shadow-lg font-semibold ${
                                    selectedTemplate === template.id
                                        ? "bg-purple-200 border-purple-400 scale-105"
                                        : "bg-white border-gray-200"
                                }`}
                            >
                                {template.emoji} {template.name}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Canvas Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <RoutineCanvas
                            routineItems={routineItems}
                            title="My Perfect Day"
                            canvasId="routine-canvas"
                            template={currentTemplate}
                        />
                    </motion.div>

                    {/* Controls Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* Add/Edit Routine Items */}
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                📝 Edit Routine
                            </h3>

                            {/* Current Items */}
                            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                                {routineItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl"
                                    >
                                        <span className="text-2xl">
                                            {item.icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm">
                                                {item.time}
                                            </div>
                                            <div className="text-sm text-gray-600 truncate">
                                                {item.activity}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                deleteRoutineItem(item.id)
                                            }
                                            className="text-red-500 hover:text-red-700 text-xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Add New Item */}
                            {!showAddForm ? (
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="w-full py-3 bg-purple-400 text-white rounded-2xl font-semibold hover:scale-105 transition-transform"
                                >
                                    + Add Task
                                </button>
                            ) : (
                                <div className="space-y-3 p-4 bg-purple-50 rounded-2xl">
                                    <div>
                                        <label className="block text-sm font-semibold text-purple-700 mb-1">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            value={newTime}
                                            onChange={(e) =>
                                                setNewTime(e.target.value)
                                            }
                                            className="w-full px-4 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-purple-700 mb-1">
                                            Activity
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Yoga Session"
                                            value={newActivity}
                                            onChange={(e) =>
                                                setNewActivity(e.target.value)
                                            }
                                            className="w-full px-4 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={addRoutineItem}
                                            className="flex-1 py-2 bg-purple-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowAddForm(false);
                                                setNewTime("");
                                                setNewActivity("");
                                            }}
                                            className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:scale-105 transition-transform"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Export Button */}
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                📱 Export Your Routine
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Download your routine as a high-quality PNG
                                perfect for phone wallpapers, lock screens, or
                                printing!
                            </p>
                            <ExportButton
                                canvasId="routine-canvas"
                                filename="my-routine-wallpaper"
                            />
                        </div>

                        {/* Features Info */}
                        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                ✨ Features
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-xl">🎨</span>
                                    <span>
                                        8 aesthetic templates to choose from
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-xl">📱</span>
                                    <span>
                                        Perfect 9:16 aspect ratio for phones
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-xl">💎</span>
                                    <span>High-resolution export (3x DPI)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-xl">🎀</span>
                                    <span>Cute washi tape styled blocks</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-xl">🌈</span>
                                    <span>Customizable themes and colors</span>
                                </li>
                            </ul>
                        </div>

                        {/* Tips */}
                        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-3xl border-4 border-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
                            <p className="text-sm text-gray-700">
                                <span className="font-bold">💡 Tip:</span> Use
                                the theme switcher in the navigation to change
                                the overall color scheme!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
