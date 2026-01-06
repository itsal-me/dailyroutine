import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cute emoji pool for random assignment
const CUTE_EMOJIS = [
    "✨", // Sparkles
    "🌸", // Cherry blossom
    "🦋", // Butterfly
    "🌈", // Rainbow
    "🍓", // Strawberry
    "🧁", // Cupcake
    "🎀", // Ribbon
    "💖", // Sparkling heart
    "🌙", // Moon
    "⭐", // Star
    "🍀", // Four leaf clover
    "🌺", // Hibiscus
    "🎨", // Art palette
    "🎵", // Music note
    "📚", // Books
    "☕", // Coffee
    "🍰", // Cake
    "🌻", // Sunflower
    "🦄", // Unicorn
    "💫", // Dizzy
];

// Get a random cute emoji
const getRandomCuteEmoji = () => {
    const randomIndex = Math.floor(Math.random() * CUTE_EMOJIS.length);
    return CUTE_EMOJIS[randomIndex];
};

export interface Task {
    id: string;
    title: string;
    time: string;
    completed: boolean;
    icon: string;
}

interface RoutineStore {
    tasks: Task[];
    addTask: (title: string, time: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    clearCompleted: () => void;
    reorderTasks: (startIndex: number, endIndex: number) => void;
}

export const useRoutineStore = create<RoutineStore>()(
    persist(
        (set) => ({
            tasks: [],

            // Add a new task with automatic cute emoji assignment
            addTask: (title: string, time: string) => {
                const newTask: Task = {
                    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    title,
                    time,
                    completed: false,
                    icon: getRandomCuteEmoji(),
                };

                set((state) => ({
                    tasks: [...state.tasks, newTask],
                }));
            },

            // Toggle task completion status
            toggleTask: (id: string) => {
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id
                            ? { ...task, completed: !task.completed }
                            : task
                    ),
                }));
            },

            // Delete a specific task
            deleteTask: (id: string) => {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                }));
            },

            // Clear all completed tasks
            clearCompleted: () => {
                set((state) => ({
                    tasks: state.tasks.filter((task) => !task.completed),
                }));
            },

            // Reorder tasks (for drag and drop functionality)
            reorderTasks: (startIndex: number, endIndex: number) => {
                set((state) => {
                    const result = Array.from(state.tasks);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);

                    return {
                        tasks: result,
                    };
                });
            },
        }),
        {
            name: "cute-routine-storage", // localStorage key
        }
    )
);
