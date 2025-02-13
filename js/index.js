/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  const time = document.querySelector('#time');
  const meter = document.querySelector('#meter');
  const submitBtn = document.querySelector('#btnSubmit');
  const resetBtn = document.querySelector('#btnReset');
  const scoreElement = document.querySelector('#score');

  let remainingTime = 60; 
  // Keeping track if the user submitted the test on time
  let submitted = false; 

  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    timer();
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q:'What does CSS stand for?',
      o:['Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets'],
      a:2,
    },
    {
      q:'What is the name of the CSS selector to style the element with id named car?',
      o:['.car', '$car', '#car', 'car'],
      a: 2,
  }
  ];

  // Function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

   // Function to display the timer
   const timer = () => {
    let countdown = setInterval(() => {    
      if (submitted){
        time.innerHTML = 'Great job! You have submitted your answers right on time. Check your score.'
      }   
      else if (remainingTime > 0) {
        remainingTime--;
        time.innerHTML =`00:${remainingTime}`
        meter.setAttribute('value',`${remainingTime}`);
      } else {
        time.innerHTML = 'Oops... Your time is up. Check your score and try again.'
        calculateScore();
      }
    },1000);
    }

  // Function to calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          // if the answer is correct highlight it green
          liElement.style.backgroundColor = '#7EE6DA';
        }  
          
        // checking score
        if (radioElement.checked) {
          // code for task 1 goes here
          if (i == quizItem.a){
            score++;
          } else {
            // if the answer is incorrect highlight it red
            liElement.style.backgroundColor = '#FFA8B6';
          }
        }
      }
    });
    scoreElement.innerHTML = `Your score is ${score} out of 5.`;
    submitBtn.style.display = 'none';

    // Checking if user submitted the quiz on time when calculate score function is called.
    if (remainingTime > 0) {
      submitted = true;      
    }
  };

  // Call the displayQuiz function
  displayQuiz();

// Reload when reset button is clicked
resetBtn.addEventListener('click',() => window.location.reload());
submitBtn.addEventListener('click', calculateScore);

});

