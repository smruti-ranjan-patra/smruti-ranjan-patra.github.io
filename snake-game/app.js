document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid div');
    const scoreBody = document.querySelector('.score span');
    const startButton = document.querySelector('.start');
    let audio = new AudioContext();

    const height = 20;
    const width = 20;
    const delayForFristFoodOccurrence = 2000;
    let snake = [];
    let tailIndex = 0;
    let direction = 1;
    let foodIndex = 0;
    let foodPresent = false;
    let score = 0;
    let speed = 0.9;
    let interval = 0;
    let intervalTime = 0;


    function start() {
        gameRunning = true;
        clearInterval(interval);
        grids.forEach(grid => grid.classList.remove('snake', 'food', 'dead-snake', 'food'));
        snake = [5, 4, 3, 2];
        direction = 1; // default right direction
        score = 0;
        setTimeout(() => insertFood(), delayForFristFoodOccurrence);
        scoreBody.innerText = score;
        intervalTime = 1000;
        snake.forEach(index => grids[index].classList.add('snake'));
        interval = setInterval(moveSnake, intervalTime)
    }

    function moveSnake() {

        tailIndex = snake.pop();
        grids[tailIndex].classList.remove('snake');

        // Check the boundary conditions and wrap them
        let newHeadIndex = snake[0];

        if (direction === 1 && snake[0]%width === width-1) {
            // right boundary
            newHeadIndex = snake[0] - (width - 1);
        } else if (direction === -1 && snake[0]%width === 0) {
            // left boundary
            newHeadIndex = snake[0] + (width - 1);
        } else if (direction === -width && snake[0] < width) {
            // top boundary
            newHeadIndex = (width * (height-1)) + snake[0];
        } else if (direction === width && snake[0] >= (width * (height-1))) {
            // bottom boundary
            newHeadIndex = snake[0] % width;
        } else {
            newHeadIndex += direction;
        }

        if (grids[newHeadIndex].classList.contains('snake')) {
            //if snake bites itself
            death();
            return clearInterval(interval);
        }

        snake.unshift(newHeadIndex);

        if (grids[newHeadIndex].classList.contains('food')) {
            grids[newHeadIndex].classList.remove('food');
            snake.push(tailIndex);
            grids[tailIndex].classList.add('snake');
            score++;
            insertFood();
            scoreBody.innerText = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveSnake, intervalTime);
        }

        grids[newHeadIndex].classList.add('snake');
    }

    function insertFood() {
        do {
            foodIndex = Math.floor(Math.random() * height * width);
        } while (grids[foodIndex].classList.contains('snake')); // avoid food not to appear on the snake

        grids[foodIndex].classList.add('food');
    }

    function setDirection(event) {

        if (event.keyCode === 39 && direction !== -1) {
            direction = 1; //right arrow
        } else if (event.keyCode === 38 && direction !== width) {
            direction = -width; //up arrow
        } else if (event.keyCode === 37 && direction !== 1) {
            direction = -1; //left arrow
        } else if (event.keyCode === 40 && direction !== -width) {
            direction = +width; //down arrow
        } else {
            beep(50, 70, 200);
        }
    }

    function death() {
        beep(50, 50, 600);
        beep(50, 220, 300);
        snake.forEach(index => grids[index].classList.remove('snake'));
        snake.forEach(index => grids[index].classList.add('dead-snake'));
        alert('GAME OVER');
    }

    function beep(vol, freq, duration) {
        v = audio.createOscillator()
        u = audio.createGain()
        v.connect(u)
        v.frequency.value = freq
        v.type = "square"
        u.connect(audio.destination)
        u.gain.value = vol * 0.01
        v.start(audio.currentTime)
        v.stop(audio.currentTime + duration * 0.001)
    }

    document.addEventListener('keyup', setDirection)
    startButton.addEventListener('click', start)
});