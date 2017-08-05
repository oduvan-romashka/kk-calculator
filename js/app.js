document.addEventListener("DOMContentLoaded", function() {

    //set initial state for further using in validation
    var initialState = true;

    var btnHandler = function(e) {
        e.preventDefault();
        var attribute = this.getAttribute("data-action");

        switch (attribute) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                chrHandler(attribute);
                break;
            case '+':
            case '-':
            case '/':
            case '*':
                operationHandler(attribute);
                break;
            case 'C':
                cleanHandler();
                break;
            case '(':
                openBracketHandler(attribute);
                break;
            case ')':
                closeBracketHandler(attribute);
                break;
            case '=':
                resultHandler();
                break;
            default:
                throw new Error('Action is not matched.');
        }
    };

    function resultHandler() {
        if (!initialState) {
            var expression = document.getElementById('calcScreen').value;
            var result = math.eval(expression);
            document.getElementById('calcScreen').value = result;
        }
    }

    function cleanHandler() {
        initialState = true;
        document.getElementById('calcScreen').value = '0';
    }

    function actionHandler(action) {
        var prevAction = document.getElementById('calcScreen').value;
        if (prevAction === '0') {
            document.getElementById('calcScreen').value = action;
        } else {
            document.getElementById('calcScreen').value = prevAction + action;
        }
    }

    function chrHandler(action) {
        initialState = false;
        var prevAction = document.getElementById('calcScreen').value;
        var lastAction = prevAction.substring(prevAction.length - 1, prevAction.length);
        if (lastAction !== ')') {
            actionHandler(action);
        }
    }

    function firstChrHandler(action) {
        var prevAction = document.getElementById('calcScreen').value;
        if (prevAction.length === 1 && prevAction.value === '0') {
            if (prevAction !== '+' && prevAction !== '-' && prevAction !== '/' && prevAction !== '*' && prevAction !== ')') {
                actionHandler(action);
            }
        }
    }

    function operationHandler(action) {
        if (!initialState) {
            var prevAction = document.getElementById('calcScreen').value;
            var lastAction = prevAction.substring(prevAction.length - 1, prevAction.length);
            if (lastAction !== '+' && lastAction !== '-' && lastAction !== '/' && lastAction !== '*' && lastAction !== '(') {
                actionHandler(action);
            }
        }
    }

    function openBracketHandler(action) {
        var prevAction = document.getElementById('calcScreen').value;
        var lastAction = prevAction.substring(prevAction.length - 1, prevAction.length);
        if (lastAction !== ')' && lastAction !== '1' && lastAction !== '2' && lastAction !== '3' && lastAction !== '4' && lastAction !== '5' && lastAction !== '6' && lastAction !== '7' && lastAction !== '8' && lastAction !== '9') {
            actionHandler(action);
        }
    }

    function countElements(elem) {
        var prevAction = document.getElementById('calcScreen').value;
        var count = 0;
        for (var i = 0; i < prevAction.length; i++) {
            if (prevAction[i] === elem) {
                count++;
            }
        }
        return count;
    }

    function closeBracketHandler(action) {
        if (!initialState) {
            var countOpenBrackets = countElements('(');
            var countCloseBrackets = countElements(')');
            if (countOpenBrackets > countCloseBrackets) {
                var prevAction = document.getElementById('calcScreen').value;
                var lastAction = prevAction.substring(prevAction.length - 1, prevAction.length);
                if (lastAction !== '+' && lastAction !== '-' && lastAction !== '/' && lastAction !== '*' && lastAction !== '(') {
                    actionHandler(action);
                }
            }
        }
    }

    //listener for clicks
    var classname = document.getElementsByClassName("btn");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', btnHandler, false);
    }
});