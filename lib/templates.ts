export interface TemplateFont {
    title: string; // Font for main titles
    time: string; // Font for time displays
    body: string; // Font for activity text
}

export interface TemplateBorder {
    style: "dashed" | "double" | "bubbly" | "solid" | "dotted";
    width: string;
    color: string;
    radius: string;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    emoji: string;
    background: {
        gradient: string;
        paperColor: string;
    };
    fonts: TemplateFont;
    border: TemplateBorder;
    blockColors: string[]; // Array of colors for routine blocks
    accentColor: string;
}

export const templates: Template[] = [
    {
        id: "strawberry-milk",
        name: "Strawberry Milk",
        description: "Sweet and dreamy pink aesthetic",
        emoji: "🍓",
        background: {
            gradient: "linear-gradient(135deg, #FFD1DC 0%, #FFB6C1 50%, #FFC0CB 100%)",
            paperColor: "#FFF5F7",
        },
        fonts: {
            title: "Georgia, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "bubbly",
            width: "4px",
            color: "#FFB6C1",
            radius: "24px",
        },
        blockColors: ["#FFD1DC", "#FFE4E1", "#FFC0CB", "#FFB6C1", "#FFDAB9"],
        accentColor: "#FF69B4",
    },
    {
        id: "matcha-dream",
        name: "Matcha Dream",
        description: "Calm and refreshing green vibes",
        emoji: "🍵",
        background: {
            gradient: "linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 50%, #C8E6C9 100%)",
            paperColor: "#F1F8F4",
        },
        fonts: {
            title: "Palatino, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "dashed",
            width: "3px",
            color: "#81C784",
            radius: "20px",
        },
        blockColors: ["#C8E6C9", "#A5D6A7", "#E0F2F1", "#B2DFDB", "#DCEDC8"],
        accentColor: "#4CAF50",
    },
    {
        id: "academic-aesthetic",
        name: "Academic Aesthetic",
        description: "Scholarly and sophisticated",
        emoji: "📚",
        background: {
            gradient: "linear-gradient(135deg, #F5F5DC 0%, #FFF8DC 50%, #FAEBD7 100%)",
            paperColor: "#FFFEF7",
        },
        fonts: {
            title: "Times New Roman, serif",
            time: "Courier New, monospace",
            body: "Georgia, serif",
        },
        border: {
            style: "double",
            width: "6px",
            color: "#8B7355",
            radius: "12px",
        },
        blockColors: ["#F5F5DC", "#FFF8DC", "#FAEBD7", "#FFE4B5", "#FFDEAD"],
        accentColor: "#8B4513",
    },
    {
        id: "midnight-star",
        name: "Midnight Star",
        description: "Deep and mystical night theme",
        emoji: "🌙",
        background: {
            gradient: "linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 50%, #DDA0DD 100%)",
            paperColor: "#F8F4FF",
        },
        fonts: {
            title: "Georgia, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "solid",
            width: "4px",
            color: "#9370DB",
            radius: "28px",
        },
        blockColors: ["#E6E6FA", "#D8BFD8", "#DDA0DD", "#EE82EE", "#DA70D6"],
        accentColor: "#8A2BE2",
    },
    {
        id: "sunny-citrus",
        name: "Sunny Citrus",
        description: "Bright and energizing yellow aesthetic",
        emoji: "🍋",
        background: {
            gradient: "linear-gradient(135deg, #FFF9E6 0%, #FFFACD 50%, #FFEFD5 100%)",
            paperColor: "#FFFEF9",
        },
        fonts: {
            title: "Georgia, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "dotted",
            width: "5px",
            color: "#FFD700",
            radius: "16px",
        },
        blockColors: ["#FFF9E6", "#FFFACD", "#FFEFD5", "#FFE4B5", "#FFDAB9"],
        accentColor: "#FFA500",
    },
    {
        id: "slow-sunday",
        name: "Slow Sunday",
        description: "Peaceful and relaxing lavender tones",
        emoji: "☁️",
        background: {
            gradient: "linear-gradient(135deg, #F0E6FF 0%, #E8DAFF 50%, #F5F0FF 100%)",
            paperColor: "#FCFAFF",
        },
        fonts: {
            title: "Palatino, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "bubbly",
            width: "4px",
            color: "#C4B5FD",
            radius: "32px",
        },
        blockColors: ["#F0E6FF", "#E8DAFF", "#DDD6FE", "#C4B5FD", "#A78BFA"],
        accentColor: "#8B5CF6",
    },
    {
        id: "cherry-blossom",
        name: "Cherry Blossom",
        description: "Delicate spring sakura aesthetic",
        emoji: "🌸",
        background: {
            gradient: "linear-gradient(135deg, #FFE4E9 0%, #FFD6E0 50%, #FADADD 100%)",
            paperColor: "#FFF7F9",
        },
        fonts: {
            title: "Georgia, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "dashed",
            width: "3px",
            color: "#FFB3C6",
            radius: "20px",
        },
        blockColors: ["#FFE4E9", "#FFD6E0", "#FADADD", "#FFB3C6", "#FFC1D4"],
        accentColor: "#FF69B4",
    },
    {
        id: "ocean-breeze",
        name: "Ocean Breeze",
        description: "Fresh and airy blue waves",
        emoji: "🌊",
        background: {
            gradient: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 50%, #E1F5FE 100%)",
            paperColor: "#F7FCFE",
        },
        fonts: {
            title: "Palatino, serif",
            time: "Quicksand, sans-serif",
            body: "Quicksand, sans-serif",
        },
        border: {
            style: "solid",
            width: "4px",
            color: "#4DD0E1",
            radius: "24px",
        },
        blockColors: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"],
        accentColor: "#00ACC1",
    },
];

/**
 * Get all available templates
 */
export function getTemplates(): Template[] {
    return templates;
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(id: string): Template | undefined {
    return templates.find((template) => template.id === id);
}

/**
 * Get a random template
 */
export function getRandomTemplate(): Template {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
}

/**
 * Get template names for dropdown/selector
 */
export function getTemplateOptions(): { id: string; name: string; emoji: string }[] {
    return templates.map((template) => ({
        id: template.id,
        name: template.name,
        emoji: template.emoji,
    }));
}
