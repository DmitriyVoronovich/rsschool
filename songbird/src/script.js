import birdsData from "./data";
import "./style.css";
import {fillTaskContainer, getBirdElement, prepareTasks} from "./utils";
import rsSchoolJS from './img/rs_school_js.svg'
import screenshot_2 from './img/Screenshot_2.png'

let selectTab = 0;
let counter = 5;
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.footer_logo').setAttribute('src', rsSchoolJS);

    const butNext = document.querySelector('.button_next');
    prepareTasks(selectTab, counter)
    // buttom
    butNext.onclick = function (event) {
        if (selectTab < 5) {
            selectTab++;
            document.querySelectorAll('.task_category').forEach((item, index) => {
                if (index === selectTab) {
                    item.classList.add('task_category_active')
                } else {
                    item.classList.remove('task_category_active')
                }
            })
            prepareTasks(selectTab, counter)
        } else {
            const quizContainer = document.querySelector('.quiz_container');
            const score = document.querySelector('.header_score_counter');
            quizContainer.innerHTML = '';

            let final = document.createElement('div');
            final.classList.add('final_container');

            let finalTitle = document.createElement('h3');
            finalTitle.classList.add('final_title');
            finalTitle.textContent = 'Поздравляю!';

            let finalText = document.createElement('p');
            finalText.classList.add('final_text');
            finalText.textContent = `Вы прошли викторину и набрали ${score.textContent} из 30 возможных баллов`;

            let finalBtn = document.createElement('div');
            finalBtn.classList.add('final_button');

            let btn = document.createElement('a');
            btn.classList.add('return_button');
            btn.textContent = 'Попробовать еще раз';
            btn.setAttribute('href', 'index.html')

            finalBtn.append(btn);

            quizContainer.append(final);
            final.append(finalTitle, finalText, finalBtn);
        }
    }

})