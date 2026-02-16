(function () {
    'use strict';

    var scrollContainer = document.getElementById('scroll-container');
    var outputEl = document.getElementById('output');
    var inputForm = document.getElementById('input-form');
    var inputEl = document.getElementById('command-input');

    var MSG = {
        NARRATION: 'narration',
        SYSTEM: 'system',
        ECHO: 'echo',
        ERROR: 'error',
    };

    function addMessage(text, type) {
        if (type === undefined) type = MSG.NARRATION;
        var p = document.createElement('p');
        p.classList.add('msg-' + type);
        p.textContent = text;
        outputEl.appendChild(p);
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }

    function handleSubmit(e) {
        e.preventDefault();
        var command = inputEl.value.trim();
        inputEl.value = '';
        if (!command) return;
        addMessage('> ' + command, MSG.ECHO);
        processCommand(command);
        inputEl.focus();
    }

    function processCommand(command) {
        var lower = command.toLowerCase();
        if (lower === 'help') {
            addMessage('Available commands: look, inventory, go [place], help, clear', MSG.SYSTEM);
        } else if (lower === 'clear') {
            outputEl.innerHTML = '';
            addMessage('Screen cleared.', MSG.SYSTEM);
        } else if (lower === 'look') {
            addMessage('You look around. The world feels familiar, like a memory you can almost reach.', MSG.NARRATION);
        } else if (lower === 'inventory') {
            addMessage('You check your pockets. Nothing yet.', MSG.NARRATION);
        } else {
            addMessage('I don\'t understand "' + command + '". Type "help" for available commands.', MSG.ERROR);
        }
    }

    function showWelcome() {
        addMessage('SAM PARADISE', MSG.SYSTEM);
        addMessage('A text adventure through memory.', MSG.NARRATION);
        addMessage('', MSG.NARRATION);
        addMessage('Type "help" if you get stuck and need suggestions.', MSG.SYSTEM);
        addMessage('', MSG.NARRATION);
    }

    function init() {
        inputForm.addEventListener('submit', handleSubmit);
        scrollContainer.addEventListener('click', function () {
            inputEl.focus();
        });
        showWelcome();
        inputEl.focus();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
