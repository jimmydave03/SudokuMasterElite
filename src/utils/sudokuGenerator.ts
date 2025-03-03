const GRID_SIZE = 9;

export const generateSudoku = (difficulty: string) => {
  // Generate a solved Sudoku grid
  const solvedGrid = generateSolvedGrid();
  
  // Create a copy of the solved grid
  const puzzle = solvedGrid.map(row => [...row]);
  
  // Remove numbers based on difficulty
  const cellsToRemove = getDifficultyRemovalCount(difficulty);
  removeNumbers(puzzle, cellsToRemove);
  
  return {
    puzzle,
    solution: solvedGrid,
  };
};

const generateSolvedGrid = () => {
  const grid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
  fillGrid(grid);
  return grid;
};

const fillGrid = (grid: number[][]) => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= GRID_SIZE; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const isValid = (grid: number[][], row: number, col: number, num: number) => {
  // Check row
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  
  return true;
};

const getDifficultyRemovalCount = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 35;
    case 'medium':
      return 45;
    case 'hard':
      return 55;
    default:
      return 35;
  }
};

const removeNumbers = (grid: number[][], count: number) => {
  let removed = 0;
  while (removed < count) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removed++;
    }
  }
};

export const checkSolution = (grid: number[][]) => {
  // Check if the grid is completely filled
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) return false;
    }
  }

  // Check each row, column, and 3x3 box
  for (let i = 0; i < GRID_SIZE; i++) {
    if (!isValidUnit(grid[i]) || // Check row
        !isValidUnit(grid.map(row => row[i])) || // Check column
        !isValidBox(grid, Math.floor(i / 3) * 3, (i % 3) * 3)) { // Check 3x3 box
      return false;
    }
  }
  
  return true;
};

const isValidUnit = (unit: number[]) => {
  const numbers = new Set();
  for (const num of unit) {
    if (numbers.has(num)) return false;
    numbers.add(num);
  }
  return true;
};

const isValidBox = (grid: number[][], startRow: number, startCol: number) => {
  const numbers = new Set();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const num = grid[startRow + i][startCol + j];
      if (numbers.has(num)) return false;
      numbers.add(num);
    }
  }
  return true;
};
