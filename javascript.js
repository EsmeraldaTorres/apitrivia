let correctsAnswers = []
let radios = []


function getCategories() {
    const url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then((response) => response.json())
        .then((data) => printCategories(data.trivia_categories))
}


function getQuestions() {
    const totalQuestions = document.getElementById('total-questions').value;
    const category = document.getElementById('select-category').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${difficulty}&type=${type}
    `)
        .then((response) => response.json())
        .then((data) => printData(data))
}


function printData(data) {
    let container = document.getElementById('questions-container');
    container.innerHTML = ""
    if(data.results.length === 0){
      container.innerHTML += `<div class="padding-top margin-bottom"><div class="justify-content-center align-items-center alert alert-warning" role="alert">
                                    ¡Try another type, this section is empty!
                                </div></div>`;
    } else {
    container.innerHTML = `<div class="col-md-12 row justify-content-center"><h2 class="padding-top margin-bottom">${data.results[0].category}</h2></div>`
    data.results.forEach((element,index) => {
    correctsAnswers.push(element.correct_answer)
      //  correctsAnswers = correctAnswers(data);
        container.innerHTML += `<div class=" col-md-6 col-lg-4">
                                  <div class="card">
                                    <div class="card-body">
                                      <h5>${element.question}</h5>                 
                                      ${getAnswers(element,index)}
                                    </div>
                                  </div>
                                </div>`;
    });
    container.innerHTML += `<div class="col-sm-12 row btn-results padding-top margin-bottom"><button onsubmit=" onclick="validate()" class="btn col-sm-7 btn-primary">Results</button></div>`;}
    // correctsAnswers += correctAnswers(data);
    console.log(correctsAnswers)
}


function getAnswers(elementos, index){
    let elementCorrectA = elementos.correct_answer
    let elementIncorrect = [...elementos.incorrect_answers]
    elementIncorrect.push(elementCorrectA);
    elementIncorrect.sort(function () { return Math.random() - 0.5 });
    let totalAnswers= '';
    elementIncorrect.forEach((answer) => {
        // radios.push(`radio-${index}`)
        totalAnswers += `<div class="radio mt-3">
                          <label>
                          <input class="radiobtns" value="${answer}" type="radio" name="radio-${index}" required>${answer}</label>
                        </div>`;
                        // console.log(`radio-${index}`)
                      }
    );
    radios.push(`radio-${index}`)
    console.log(radios)
    return totalAnswers
}


// function correctAnswers(questions) {
//   let correctAns = [];
//   questions.forEach(question => correctAns.push(question.correct_answer));
//   console.log(correctAns)
//   return correctAns;
// }

// function radioChecked (){
//   const hola = document.getElementsByName(`radio-${index}`);
//   hola.forEach(radio => { console.log(radio)
//     });
// }


function validate() {
  let rigths = 0;
  
  for (let i = 0; i < correctsAnswers.length; i++) {
    // console.log(correctsAnswers)
      const options = document.getElementsByName(`radio-${i}`);
    // console.log(radios)
      options.forEach(radio => {
          if (radio.checked) {
            console.log(radio.checked)
              if (radio.value == correctsAnswers[i]) {
                // console.log(radio.valu)
                  rigths++
              }
          };
      });
  };
  if (rigths === correctsAnswers.length) {
      alert('¡GOOD JOB! You have right' + ' '+ correctsAnswers.length  + ' ' + 'answers.');
  }
  if (rigths < correctsAnswers.length) {
      alert('¡TRY AGAIN! You have right' + ' ' + rigths + ' ' + 'of ' + correctsAnswers.length + ' '  + 'answers.');
  }
}


function printCategories(categories) {
    const categoriesContainer = document.getElementById('select-category');
    categories.forEach((category) => {
        categoriesContainer.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}
getCategories()

// function resultsUser (){
//   alert('respuestas del usuario')
// }
// console.log(correctsAnswers)

