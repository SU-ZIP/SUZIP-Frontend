import React from "react";
import styled from "styled-components";

// Typescript interface for diary entry, adjust according to your actual data structure
interface DiaryEntry {
    id: number;
    title: string;
    date: string;
    content: string;
    imageUrl: string;
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1274px;
    align-items: center;
`;

const Title = styled.h1`
    font-family: 'PPMonumentExtended', sans-serif;
    font-weight: normal;
    font-size: 32px;
    color: #333333;
`;

const SearchBar = styled.input`
    weight: 212px;
    height: 34px;
    background-color: #EAEAEA;
    border-radius: 5px;
    outline: none;
`;

const Divider = styled.hr`
    border: none;
    width: 1274px;
    height: 1px;
    background-color: #C4C4C4;
    margin-bottom: 20px;
`;

const DiaryEntriesContainer = styled.div`
    /* Style for your diary entries container */
`;

// Placeholder data, replace with your actual diary entries data
const diaryEntries: DiaryEntry[] = [
    // Example
    // { id: 1, title: "Entry Title", date: "YYYY-MM-DD", content: "Diary entry content", imageUrl: "image-url.jpg" },
];

const DiaryPage: React.FC = () => {
    return (
        <PageContainer>
            <Header>
                <Title>MY DIARIES</Title>
                <SearchBar placeholder="Search" />
            </Header>
            <Divider />
            <DiaryEntriesContainer>
                {/* Map through your diaryEntries array to display each entry */}
                {diaryEntries.map(entry => (
                    <div key={entry.id}>
                        {/* Display your diary entry here, adjust according to your actual structure */}
                    </div>
                ))}
            </DiaryEntriesContainer>
        </PageContainer>
    );
};

export default DiaryPage;
