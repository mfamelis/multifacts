document.addEventListener('DOMContentLoaded', () => {
    const factor1El = document.getElementById('factor1');
    const factor2El = document.getElementById('factor2');
    const productEl = document.getElementById('product');
    const answerContainer = document.getElementById('answer-container');
    const revealBtn = document.getElementById('reveal-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const progressTable = document.getElementById('progress-table');

    let currentFactor1 = 0;
    let currentFactor2 = 0;
    const revealedFacts = new Set(); // Stores "min,max" strings

    // Initialize Table 2-9
    function initTable() {
        progressTable.innerHTML = '';

        // Rows 2 to 9
        for (let r = 2; r <= 9; r++) {
            const tr = document.createElement('tr');

            // Row Header
            const th = document.createElement('th');
            th.textContent = r;
            th.classList.add('cell-header');
            tr.appendChild(th);

            // Cells (Column 2 to r)
            for (let c = 2; c <= r; c++) {
                const td = document.createElement('td');
                td.id = `cell-${c}-${r}`;
                tr.appendChild(td);
            }
            progressTable.appendChild(tr);
        }

        // Bottom Header Row
        const trBottom = document.createElement('tr');
        const thCorner = document.createElement('th');
        thCorner.textContent = '×';
        thCorner.classList.add('cell-header');
        trBottom.appendChild(thCorner);

        for (let c = 2; c <= 9; c++) {
            const th = document.createElement('th');
            th.textContent = c;
            th.classList.add('cell-header');
            trBottom.appendChild(th);
        }
        progressTable.appendChild(trBottom);
    }

    function getUnrevealedFacts() {
        const facts = [];
        for (let r = 2; r <= 9; r++) {
            for (let c = 2; c <= r; c++) {
                const key = `${c},${r}`;
                if (!revealedFacts.has(key)) {
                    facts.push([c, r]);
                }
            }
        }
        return facts;
    }

    function generateSmartQuestion() {
        const facts = getUnrevealedFacts();

        if (facts.length === 0) {
            // Game Over
            showRestart();
            return;
        }

        const randomIndex = Math.floor(Math.random() * facts.length);
        const [a, b] = facts[randomIndex];

        // Randomize order
        if (Math.random() > 0.5) {
            currentFactor1 = a;
            currentFactor2 = b;
        } else {
            currentFactor1 = b;
            currentFactor2 = a;
        }

        factor1El.textContent = currentFactor1;
        factor2El.textContent = currentFactor2;
        productEl.textContent = currentFactor1 * currentFactor2;

        answerContainer.classList.add('hidden');
        answerContainer.style.visibility = 'hidden';

        revealBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        restartBtn.classList.add('hidden');
    }

    function revealAnswer() {
        answerContainer.classList.remove('hidden');
        answerContainer.style.visibility = 'visible';

        revealBtn.classList.add('hidden');

        // Update Table
        const min = Math.min(currentFactor1, currentFactor2);
        const max = Math.max(currentFactor1, currentFactor2);
        const key = `${min},${max}`;

        if (!revealedFacts.has(key)) {
            revealedFacts.add(key);
            const cell = document.getElementById(`cell-${min}-${max}`);
            if (cell) {
                cell.textContent = min * max;
                cell.classList.add('cell-filled');
            }
        }

        // Check completion
        const remaining = getUnrevealedFacts();
        if (remaining.length === 0) {
            nextBtn.classList.add('hidden');
            restartBtn.classList.remove('hidden');
            restartBtn.focus();
        } else {
            nextBtn.classList.remove('hidden');
            nextBtn.focus();
        }
    }

    function showRestart() {
        factor1El.textContent = "Done";
        factor2El.textContent = "!";
        productEl.textContent = "🎉";
        answerContainer.classList.remove('hidden');
        answerContainer.style.visibility = 'visible';

        revealBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        restartBtn.classList.remove('hidden');
    }

    function restartGame() {
        revealedFacts.clear();
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('cell-filled');
        });

        generateSmartQuestion();
    }

    revealBtn.addEventListener('click', revealAnswer);
    nextBtn.addEventListener('click', generateSmartQuestion);
    restartBtn.addEventListener('click', restartGame);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (!revealBtn.classList.contains('hidden')) {
                revealAnswer();
            } else if (!nextBtn.classList.contains('hidden')) {
                generateSmartQuestion();
            } else if (!restartBtn.classList.contains('hidden')) {
                restartGame();
            }
        }
    });

    // Initialize
    initTable();
    generateSmartQuestion();
});
