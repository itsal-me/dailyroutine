"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeName = "strawberry" | "matcha" | "blueberry";

interface ThemeColors {
    name: ThemeName;
    background: string;
    paper: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
}

const themes: Record<ThemeName, ThemeColors> = {
    strawberry: {
        name: "strawberry",
        background:
            "linear-gradient(135deg, #FFD1DC 0%, #FFB6C1 50%, #FFC0CB 100%)",
        paper: "#FFF5F7",
        primary: "#FF69B4",
        secondary: "#FFB6C1",
        accent: "#FF1493",
        border: "#FFB6C1",
    },
    matcha: {
        name: "matcha",
        background:
            "linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 50%, #C8E6C9 100%)",
        paper: "#F1F8F4",
        primary: "#4CAF50",
        secondary: "#81C784",
        accent: "#66BB6A",
        border: "#A5D6A7",
    },
    blueberry: {
        name: "blueberry",
        background:
            "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #E6E6FA 100%)",
        paper: "#F5F9FF",
        primary: "#5C6BC0",
        secondary: "#9FA8DA",
        accent: "#3F51B5",
        border: "#B0BEC5",
    },
};

interface ThemeContextType {
    currentTheme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    themeColors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>("strawberry");

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem(
            "cute-routine-theme"
        ) as ThemeName;
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    // Apply CSS variables when theme changes
    useEffect(() => {
        const theme = themes[currentTheme];
        const root = document.documentElement;

        root.style.setProperty("--theme-background", theme.background);
        root.style.setProperty("--theme-paper", theme.paper);
        root.style.setProperty("--theme-primary", theme.primary);
        root.style.setProperty("--theme-secondary", theme.secondary);
        root.style.setProperty("--theme-accent", theme.accent);
        root.style.setProperty("--theme-border", theme.border);

        // Save to localStorage
        localStorage.setItem("cute-routine-theme", currentTheme);
    }, [currentTheme]);

    const setTheme = (theme: ThemeName) => {
        setCurrentTheme(theme);
    };

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                setTheme,
                themeColors: themes[currentTheme],
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
