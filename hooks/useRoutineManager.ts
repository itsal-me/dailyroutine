'use client';

import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  text: string;
  timestamp: string;
  categoryIcon: string;
  isCompleted: boolean;
}

const STORAGE_KEY = 'daily-routine-tasks';

export function useRoutineManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (text: string, timestamp: string, categoryIcon: string = '✨') => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      timestamp,
      categoryIcon,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const reorderTasks = (startIndex: number, endIndex: number) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prev) => prev.filter((task) => !task.isCompleted));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return {
    tasks,
    addTask,
    removeTask,
    toggleCompletion,
    reorderTasks,
    updateTask,
    clearCompletedTasks,
    clearAllTasks,
    isLoaded,
  };
}
