import birdJpg from './img/bird.png'
import birdsData from "./data";

export const getBirdElement = (birdItem) => {

    let element = document.createElement('div');
    element.classList.add('answer_bird');
    element.classList.add('answer_bird_container');

    let img = document.createElement('img');
    img.classList.add('answer_bird_img');
    img.setAttribute('src', birdItem.image)

    let name = document.createElement('h3');
    name.classList.add('answer_bird_name');
    name.textContent = birdItem.name;

    let latinName = document.createElement('h3');
    latinName.classList.add('answer_bird_latin_name');
    latinName.textContent = birdItem.species;

    let audio = document.createElement('audio');
    audio.classList.add('answer_bird_audio');
    audio.setAttribute('controls', '');

    let soursAudio = document.createElement('source');
    soursAudio.setAttribute('src', birdItem.audio)
    soursAudio.setAttribute('type', 'audio/mpeg')
    audio.append(soursAudio)

    let p = document.createElement('p');
    p.classList.add('answer_bird_description');
    p.textContent = birdItem.description;

    element.append(img, name, latinName, audio, p)

    return element;
}

export const fillTaskContainer = (birdItem, isAnswered) => {
    const taskContainer = document.querySelector('.task_container');
    let taskImg = document.createElement('img');
    taskImg.classList.add('task_container_img');
    taskImg.setAttribute('src', isAnswered ? birdItem.image : birdJpg)

    let taskName = document.createElement('h3');
    taskName.classList.add('task_container_bird_name');
    taskName.textContent = isAnswered ? birdItem.name : '******';

    let taskAudio = document.createElement('audio');
    taskAudio.classList.add('task_container_audio');
    taskAudio.setAttribute('controls', '');

    let soursAudio = document.createElement('source');
    soursAudio.setAttribute('src', birdItem.audio)
    soursAudio.setAttribute('type', 'audio/mpeg')
    taskAudio.append(soursAudio)

    taskContainer.innerHTML = '';
    taskContainer.append(taskImg, taskName, taskAudio)
}

export const prepareTasks = (selectTab, counter) => {
    document.querySelector('.button_next').disabled = true;
    const birdDes = document.querySelector('.answer_bird_container');
    const score = document.querySelector('.header_score_counter');
    const ul = document.querySelector('.answer_bird_list');

    ul.innerHTML = '';
    birdsData[selectTab].forEach(item => {
        let newLi = document.createElement('li');
        newLi.setAttribute('id', item.id)
        newLi.innerHTML = `<span class="bird">${item.name}</span>`;
        newLi.dataset.audio = item.audio;
        newLi.classList.add('bird_marker');
        ul.appendChild(newLi);
    })

    const answerBirdNumber = Math.floor(Math.random() * birdsData[selectTab].length);
    const answerRandomBird = birdsData[selectTab][answerBirdNumber];

    fillTaskContainer(answerRandomBird, false)

    ul.onclick = function (event) {
        if (!event.target.classList.contains('bird_marker')) return;

        if (event.metaKey) {
            toggleSelect(event.target);
        } else {
            singleSelect(event.target);
        }
        birdsData[selectTab].forEach(item => {
            if (+event.target.id === item.id) {
                const selectedBirdElement = getBirdElement(item);
                birdDes.innerHTML = '';
                birdDes.appendChild(selectedBirdElement);

            }
        })
        if (+event.target.id === answerRandomBird.id) {
            fillTaskContainer(answerRandomBird, true);
            event.target.classList.add('right');
            score.textContent = parseInt(score.innerText) + counter;
            document.querySelector('.button_next').disabled = false;
        } else if(!ul.querySelector('.right')){
            event.target.classList.add('wrong');
            counter--;
        }
    }

    // предотвращает ненужное выделение элементов списка при клике
    ul.onmousedown = function () {
        return false;
    };

    function toggleSelect(li) {
        li.classList.toggle('bird_active');
    }

    function singleSelect(li) {
        let bird_active = ul.querySelectorAll('.bird_active');
        for (let elem of bird_active) {
            elem.classList.remove('bird_active');
        }
        li.classList.add('bird_active');
        console.log(bird_active)
    }
}