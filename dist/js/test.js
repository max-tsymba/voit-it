postTestFormRequests('.overlay__test', '.form__radio-btn', '.answer', 'next', 'popup-Btn', config.endPoints['test']);
removeTest('.overlay__test', '.test-close', '.test-error');

function postTestFormRequests(modalOverlayClass, radioGroupClass, answerGroupClass, submitBtnID, modalBtnID, url) {
        
    const radioBtns = document.querySelectorAll(radioGroupClass),
            answers = document.querySelectorAll(answerGroupClass),
            submitBtn = document.getElementById(submitBtnID),
            modalBtn = document.getElementById(modalBtnID),
            modal = document.querySelector(modalOverlayClass);

    modalBtn.addEventListener('click', formSend.bind(null, true));
    submitBtn.addEventListener('click', formSend.bind(null, false));

    let group = document.querySelector('.popup__group');
    group.insertAdjacentHTML('beforeend', generateAnswers());
    
    // group.innerHTML = '';

    async function formSend(isFirst, event) {
            event.preventDefault();
            const question = document.getElementById('test-question');
            let input = '';

            if(isFirst) input = '';
            else {
                for(let i = 0; i < answers.length; i++) {
                    if(answers[i].checked) {
                        input = radioBtns[i].children[1].textContent;
                    }
                }
            }

            let dataForm = new FormData();
            dataForm.set('answer', input);
            dataForm.set('question', question.textContent);

            let response = await fetch(url, {
                    credentials: 'same-origin',
                    method: 'POST',
                    body: dataForm,
                    headers: new Headers({
                            'Accept': 'application/json',
                            'X-CSRF-TOKEN': token
                    })
            });

            if(response.ok) {

                    let result = await response.json();
                    question.textContent = result.result;
                    modal.style.display = 'block';
                    
            } else {

                alert('ошибка');
                let result = await response.json();
                console.log(result);
            }
    }
}

function removeTest(modalOverlayClass, closeBtnClass, errorLabelClass) {

    const modal = document.querySelector(modalOverlayClass),
        closeBtn = document.querySelector(closeBtnClass),
        errorLabel = document.querySelector(errorLabelClass);

    closeBtn.addEventListener('click', () => {

        errorLabel.style.display = 'none';
        modal.style.display = 'none';
    });
}

function generateAnswers() {
    return `
    <div class="form__radio-btn">  
        <input class="popup__group-btn answer" id="radio-1" type="radio" value="1" name="answer-radio">
        <label for="radio-1" style="background-image: url(./img/lines.svg);">Да</label>
    </div>
    `;
}