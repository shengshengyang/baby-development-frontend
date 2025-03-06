// api.ts
import { User } from '@/contexts/AuthContext';
import { Alert } from 'react-native';

let authToken = '';
let acceptLanguage = 'zh_TW'; // 預設語言

export const setAuthToken = (token: string) => {
    authToken = token;
};

// 新增設定語言的函式
export const setAcceptLanguage = (lang: string) => {
    acceptLanguage = lang;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': acceptLanguage
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error(`登入失敗，狀態碼：${response.status}`);
    }

    const data: User = await response.json();
    // 登入成功後記錄 token
    setAuthToken(data.token);
    return data;
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    // 檢查 token 是否存在
    if (authToken === '') {
        Alert.alert('提示', '請先登入');
        return Promise.reject(new Error('請先登入'));
    }

    options.headers = {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        'Accept-Language': acceptLanguage,
        'Authorization': `Bearer ${authToken}`
    };

    return fetch(url, options);
};

// 定義圖卡相關的型別
export interface FlashCardTranslation {
    id: number;
    languageCode: string;
    frontText: string;
    backText: string;
    imageUrl: string;
}

export interface FlashCard {
    id: number;
    category: string;
    milestoneId: number;

    ageInMonths: number;
    translations: FlashCardTranslation[];
}

// 新增取得 flash-card 資料的函式（這裡假設為 open API，不需要 token）
export const getFlashCards = async (): Promise<FlashCard[]> => {
    const response = await fetch('http://localhost:8080/open/flash-card', {
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': acceptLanguage,
        },
    });
    if (!response.ok) {
        throw new Error(`取得圖卡資料失敗：${response.status}`);
    }
    return await response.json();
};
