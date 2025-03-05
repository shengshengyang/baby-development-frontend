import React, { createContext, useState, useContext } from 'react';

// 1. 定義一個介面來表示內容物
type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

// 2. 建立 Context，並給予預設值
const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // 3. 管理 theme 狀態，預設為 'light'
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 4. 實作切換主題函式
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // 5. 傳遞給 Provider
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 6. 取得 Context
export function useThemeToggle() {
    return useContext(ThemeContext);
}
