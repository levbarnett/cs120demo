let input = {
    normal: [],
    formatted: []
}
let wordIndex = 0;
let answer = {
    normal: [],
    formatted: [],
    list: [],

    getAnswer: function() {
        random = Math.floor(Math.random()*(this.list.length-1));
        this.normal = this.list[random].split("");
        console.log(this.normal);
    }
}

function reset() {
    $('#reset').addClass('hidden');
    $('.letter').text("");
    $('.correct').removeClass('correct');
    $('.present').removeClass('present');
    answer.getAnswer();
}

function guess() {
    $('#guess').val("");

    let index = 0;
    input.normal.forEach(letter => {
        $(`div[class="word ${wordIndex}"] div[class="letter ${index}"]`).text(letter);
        if (letter === answer.normal[index]) {
            $(`div[class="word ${wordIndex}"] div[class="letter ${index}"]`).addClass('correct');
        } else if (answer.normal.includes(letter)) {
            $(`div[class="word ${wordIndex}"] div[class="letter ${index}"]`).addClass('present');
        }

        index++;
    })

    if (input.normal.join('') === answer.normal.join('')) {
        alert("You Win!");
        $('#reset').removeClass('hidden');
        $('#reset').click(() => {
            reset()
        })
    } else {
        wordIndex++;
        if (wordIndex === 6) {
            alert(`Sorry, not this time! The answer was ${answer.normal.join('')}.`)
            $('#reset').removeClass('hidden');
            $('#reset').click(() => {
                reset()
            })
        }
    }
}

function init() {
    $('#guessBtn').click(() => {
        let valid = true;
        input.normal = $('#guess').val();

        if (input.normal.length != 5) {
            alert("Please enter a 5 letter word");
            return;
        }

        $.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.normal}`, () => {      
            if (valid) {
                input.normal = input.normal.split("");
                guess();
            }
        })
            .fail(() => {
                alert("Not a valid word");
                valid = false;
            });
    })
}

$(document).ready(() => {
    $.get("https://levbarnett.github.io/cs120demo/dictionary.json", data => {
        answer.list = data["words"];
        answer.getAnswer();
    })
    init();
})
