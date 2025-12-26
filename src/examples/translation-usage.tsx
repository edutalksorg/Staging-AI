// Example: How to use translations in your components

import { useTranslation } from 'react-i18next';

export const ExampleComponent = () => {
    const { t } = useTranslation();
    const userName = "Student"; // Example variable
    const topic = { title: "AI Basics" }; // Example variable
    const quiz = { description: "Test your knowledge" }; // Example variable

    return (
        <div>
            {/* Simple translation */}
            <h1>{t('dashboard.title')}</h1>

            {/* Translation with variable */}
            <p>{t('dashboard.welcomeBack')}, {userName}!</p>

            {/* Button with translation */}
            <button>{t('quiz.createNew')}</button>

            {/* Nested translations */}
            <span>{t('dashboard.stats.topicsCreated')}</span>

            {/* Instructor content - NO TRANSLATION */}
            <h3>{topic.title}</h3>  {/* This stays in English */}
            <p>{quiz.description}</p>  {/* This stays in English */}
        </div>
    );
};

// Example: UserDashboardPage with translations
const UserDashboardPage = () => {
    const { t } = useTranslation();
    const topicsCount = 5; // Example variable
    const quizzes = [{ id: 1, title: "Quiz 1", description: "Description 1" }]; // Example variable

    return (
        <div>
            <h1>{t('dashboard.title')}</h1>
            <p>{t('dashboard.readyToLearn')}</p>

            {/* Stats cards */}
            <div>
                <span>{t('dashboard.stats.topicsCreated')}</span>
                <span>{topicsCount}</span>
            </div>

            {/* Quiz section */}
            <h2>{t('quiz.title')}</h2>
            <button>{t('quiz.startQuiz')}</button>

            {/* Instructor content - stays in English */}
            {quizzes.map(quiz => (
                <div key={quiz.id}>
                    <h3>{quiz.title}</h3>  {/* NO translation */}
                    <p>{quiz.description}</p>  {/* NO translation */}
                </div>
            ))}
        </div>
    );
};
