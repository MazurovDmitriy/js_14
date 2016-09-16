'use strict';

var quest = {
  headerText: 'Тест по программированию',
  buttonText: 'Проверить мои результаты',
  questions: [
  { 
    title: 'Вопрос №1',
    options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
    trueIndex: 0
  },
  { 
    title: 'Вопрос №2',
    options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
    trueIndex: 1
  },
  { 
    title: 'Вопрос №3',
    options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
    trueIndex: 2
  }
  ]
};

localStorage.setItem('quest', JSON.stringify(quest));
var questObject = JSON.parse(localStorage.getItem('quest'));

var questContainer = document.getElementById("quest-container");
questContainer.innerHTML = tmpl("quest_template", questObject);

$('.quest__button').on('click', function() {
  var value;
  var questionsCount = questObject.questions.length;
  var trueAnswers = 0;
  var truePercents = 0;
  var html = '';
  for(var i = 0; i < questObject.questions.length; i++) {
    value = $('input[name=option_' + i + ']:checked + span').first().text();
    if(value == questObject.questions[i].options[questObject.questions[i].trueIndex]) {
      trueAnswers++;
    }
  }
  if(trueAnswers > 0) {
    truePercents = parseInt((100/questionsCount)*trueAnswers);
  }
  html += '<p>Правильных ответов: ' + trueAnswers + '</p>';
  html += '<p>Баллы: ' + truePercents + ' из 100</p>';
  showPopup(html);
  $('form').get(0).reset();

  console.log('truePercents', truePercents);
  console.log('trueAnswers', trueAnswers);
});

$('.popup').on('click', function() {
  $(this).fadeOut(300);
});

$('.popup__window').on('click', function(event) {
  event.stopPropagation();
});

function showPopup(html) {
  $('.popup__window').html(html);
  $('.popup').fadeIn(300);
}
