# Quiz Game with Gamification
**Project Overview**

This project is a web-based quiz application that fetches quiz data from an external API and presents it with a gamified experience. The app allows users to take a multiple-choice quiz, with features like a countdown timer, score tracking, rank system, badges, and fun sound effects. The app provides a smooth and engaging user interface to keep users motivated and entertained throughout the quiz.

# Setup Instructions
**Prerequisites**
    Node.js
    npm
1. Clone the repository:
   
       git clone https://github.com/Kushkusum/Quiz-React.git
       cd quiz-game
   
2. Install Dependencies
   
    Install the project dependencies using npm or yarn:

        npm install
   
        yarn install

4. Run the Application

   After installing dependencies, run the app with the following command:

        npm start

        yarn start

This will start the development server and open the app in your browser at http://localhost:3000.


## Key Features:

Fetch quiz data from the provided API endpoint: https://api.jsonserve.com/Uw5CrX

Multiple-choice questions with randomized options

Real-time timer for each question

Instant feedback with correct/incorrect sounds

Gamification: Ranks, badges, and score tracking

End-of-quiz summary with user answers and review options

Responsive and clean user interface


## Features
1. Start Quiz

   Users can start the quiz with a button that triggers the fetching of quiz questions from the API. The app presents the questions one by one, with a timer for each question.

2. Multiple-Choice Questions

   Each question is displayed with multiple-choice options. The user selects an option, and the app checks if it is correct. The user is notified with a sound (correct or incorrect).

3. Timer
   
   Each question has a countdown timer, which gives the user a limited amount of time to answer. If the timer runs out, the answer is automatically marked as incorrect.

4. Gamification
   
   Scores: The user earns points for correct answers. Points are tracked throughout the quiz.

   Ranks: After completing the quiz, the user is given a rank based on their score (Platinum, Gold, Silver, or Bronze).
 
   Badges: The user is awarded a badge based on their performance (Platinum Badge, Gold Badge, Silver Badge, or Bronze Badge).

5. End-of-Quiz Summary
   
   After completing the quiz, the user is presented with a summary of their performance. This includes:

   Total score
   Rank
   Badges earned

   A breakdown of each question, showing the correct answer, user’s answer, and whether they were correct or incorrect.

6. Hints (Bonus Feature)
   
   The app includes a hint button that allows users to view the correct answer briefly if they're stuck. A small deduction in time is applied when the hint is used.

7. Sound Effects
   
   The app uses sound effects to provide feedback to the user:

    Correct Answer: Plays a positive sound when the user selects the correct option.

    Incorrect Answer: Plays a negative sound when the user selects the wrong option.

    Completion Sound: Plays a celebration sound when the quiz is completed.

## Dependencies
React: JavaScript library for building user interfaces

axios: Promise-based HTTP client for making API requests

react-transition-group: Library for animations in React

react-confetti: Library for showing confetti animation on successful completion


