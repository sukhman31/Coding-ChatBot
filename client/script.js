import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

//used to output the ... while AI is thinking of response

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        element.textContent += '.';
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

//used to print the output letter wise like a human would think

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

//used to get unique id for each div

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) =>{

    // to prevent website from refreshing
    e.preventDefault()
    const data = new FormData(form);

    //user chat stripe
    chatContainer.innerHTML += chatStripe(false,data.get('prompt'));
    form.reset()

    //bot chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ",uniqueId);

    //as user types we want to keep scrolling down
    chatContainer.scrollTop = chatContainer.scrollHeight;

    //to fetch newly created div
    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

}

//create a function that listens for submit and executes handleSubmit
form.addEventListener('submit',handleSubmit());

//to enable submission by pressing enter 
form.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13){
        handleSubmit(e);
    }
})