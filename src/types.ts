// src/types.ts

export interface BookRecommendation {
    author: string;
    genre: string;
    image: string;
    name: string;
}

export interface MovieRecommendation {
    content: string;
    director: string;
    genre: string;
    image: string;
    name: string;
}

export interface MusicRecommendation {
    artist: string;
    image: string;
    name: string;
}

export interface EmotionResponseDto {
    emotion: string;
    recommendations: {
        book?: BookRecommendation;
        movie?: MovieRecommendation;
        music?: MusicRecommendation;
    };
}

export interface Result {
    content: string;
    createdAt: string;
    date: string;
    diaryId: number;
    emotionResponseDto: EmotionResponseDto;
    emotions: string;
    imageUrl: string | null;
    memberId: number;
    title: string;
    updatedAt: string;
}

export interface DiaryData {
    isSuccess: boolean;
    code: string;
    message: string;
    result: Result;
}
export {};
