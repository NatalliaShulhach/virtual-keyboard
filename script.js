let keys = [
    ["Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "\\", "Del"],
    ["CapsLock", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Enter"],
    ["Shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"]
];

let keysEn = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "▲", "Shift"],
    ["Ctrl", "Win", "Alt", " ", "Alt", "◄", "▼", "►", "Ctrl"]
];

let codes = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "OSLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"]
];


let IsEnglish = false;

(function PaintKeyboard() {
    let wrapper = document.createElement('div');
    wrapper.classList.add("wrapper");
    document.body.append(wrapper);


    let textarea = document.createElement('textarea');
    textarea.classList.add("textarea");
    wrapper.append(textarea);


    let keyboard = document.createElement('div');
    keyboard.classList.add("keyboard");
    wrapper.append(keyboard);

    for (let i = 0; i < 5; i++) {

        let row = document.createElement('div');
        row.classList.add("row");
        keyboard.append(row);

        for (let j = 0; j < keys[i].length; j++) {

            let key = document.createElement('div');
            key.classList.add("key");
            key.classList.add(codes[i][j]);
            row.append(key);


            let span = document.createElement('span');
            span.classList.add("ru");
            key.append(span);
            span.innerHTML = keys[i][j];


            span = document.createElement('span');
            span.classList.add("en");
            key.append(span);
            span.innerHTML = keysEn[i][j];
        }
    }
    let describe = document.createElement('p');
    wrapper.append(describe);
    describe.innerHTML = 'Change language (ctrl + shift)';
}());

let el = null;
let textarea = document.getElementsByClassName("textarea")[0];
let isShiftPressed = false;
let isControlPressed = false;

function KeyboardEventHandling(event) {
    let code = event.code;
    if (event.type === "keyup") {
        document.onkeyup = KeepStateCtrlShift;
    }
    for (let i = 0; i < codes.length; i++) {
        for (let j = 0; j < codes[i].length; j++) {
            if (code == codes[i][j]) {
                el = document.getElementsByClassName(`key ${code}`)[0];
                el.classList.add('pressed');
            }
        }
    }
}

function MouseEventHandling(event) {
    if (event.type == "mousedown") {
        el = event.target;
        if (el.tagName == 'SPAN') {
            el = el.parentElement;
        }

        el.classList.add('pressed');
        document.onmouseup = KeepStateCtrlShift;

        if (el.classList.contains('Backspace')) {
            PressedBackspace();
            return;
        }

        if (el.classList.contains('Delete')) {
            PressedDelete();
            return;
        }

        if (el.classList.contains('Enter')) {
            PressedEnter();
            return;
        }

        if (el.classList.contains('Space')) {
            PressedSpace();
            return;
        }

        if (el.classList.contains('Tab')) {
            PressedTab();
            return;
        }

        if (el.classList.contains('ArrowLeft')) {
            PressedArrowLeft();
            return;
        }

    }

    if (!(el.innerText == 'Backspace' ||
            el.innerText == "Ctrl" ||
            el.innerText == "Shift" ||
            el.innerText == "Tab" ||
            el.innerText == "CapsLock" ||
            el.innerText == "Alt" ||
            el.innerText == "Del" ||
            el.innerText == "Win" ||
            el.innerText == "Enter" ||
            el.innerText == "◄")) {
        textarea.value += `${el.innerText}`;
    }
}

function KeepStateCtrlShift() {
    if (el.innerText == "Shift") {
        if (isShiftPressed) {
            el.classList.remove('pressed');
            isShiftPressed = false;
        } else {
            isShiftPressed = true;
        }
        if (isShiftPressed && isControlPressed) {
            LanguageSwitch();
        }
        return;
    }

    if (el.innerText == "Ctrl") {
        if (isControlPressed) {
            el.classList.remove('pressed');
            isControlPressed = false;
        } else {
            isControlPressed = true;
        }
        if (isShiftPressed && isControlPressed) {
            LanguageSwitch();
        }
        return;
    }
    el.classList.remove('pressed');
}

document.querySelector(".textarea").onkeyup = KeyboardEventHandling;


let button = document.querySelectorAll('.key');

for (let i = 0; i < button.length; i++) {
    button[i].onmousedown = MouseEventHandling;
}


document.querySelectorAll(".en").forEach(x => x.classList.add("invisible"));

function LanguageSwitch() {

    if (IsEnglish) {
        localStorage.setItem('SetEnglish', false);
        document.querySelectorAll(".en").forEach(x => x.classList.add("invisible"));
        document.querySelectorAll(".ru").forEach(x => x.classList.remove("invisible"));
        IsEnglish = false;
    } else {
        localStorage.setItem('SetEnglish', true);
        document.querySelectorAll(".en").forEach(x => x.classList.remove("invisible"));
        document.querySelectorAll(".ru").forEach(x => x.classList.add("invisible"));
        IsEnglish = true;
    }
}

function PressedBackspace() {
    if (el.classList.contains('Backspace')) {
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd);
        textarea.focus();
    }
}

function PressedDelete() {
    if (el.classList.contains('Delete')) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1);
        textarea.focus();
    }
}

function PressedEnter() {
    if (el.classList.contains('Enter')) {
        textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd);
    }
}

function PressedSpace() {
    if (el.classList.contains('Space')) {
        textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end')
    }
}

function PressedTab() {
    if (el.classList.contains('Tab')) {
        textarea.value += '   ';
    }
}

if (localStorage.getItem("SetEnglish") === "true") {
    LanguageSwitch();
}
