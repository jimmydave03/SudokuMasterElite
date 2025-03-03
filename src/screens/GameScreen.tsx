import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import { generateSudoku, checkSolution } from '../utils/sudokuGenerator';
import { AdBanner } from '../components/AdBanner';

const GameScreen = ({ route, navigation }: any) => {
  const { difficulty } = route.params;
  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [solution, setSolution] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const startNewGame = useCallback(() => {
    const newGame = generateSudoku(difficulty);
    const newPuzzle = newGame.puzzle.map(row => [...row]);
    setBoard(newPuzzle);
    setInitialBoard(newPuzzle);
    setSolution(newGame.solution);
    setSelectedCell(null);
  }, [difficulty]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    startNewGame();
    setRefreshing(false);
  }, [startNewGame]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  useEffect(() => {
    // Set the header title with mode
    navigation.setOptions({
      title: `Sudoku - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode`,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: '600',
      },
    });
  }, [navigation, difficulty]);

  const handleCellPress = (row: number, col: number) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number: number) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = number;
      setBoard(newBoard);

      if (checkSolution(newBoard)) {
        Alert.alert('Congratulations!', 'You solved the puzzle!');
      }
    }
  };

  const isCorrectNumber = (row: number, col: number, value: number) => {
    if (difficulty === 'easy' && value !== 0) {
      return value === solution[row][col];
    }
    return false;
  };

  const isWrongNumber = (row: number, col: number, value: number) => {
    return difficulty === 'easy' && value !== 0 && value !== solution[row][col];
  };

  const handleAutofill = () => {
    setBoard(solution.map(row => [...row]));
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#4a90e2']}
          tintColor="#4a90e2"
        />
      }
    >
      <View style={styles.content}>
        <AdBanner position="top" />
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => {
                const isInitial = initialBoard[rowIndex][colIndex] !== 0;
                const isCorrect = !isInitial && isCorrectNumber(rowIndex, colIndex, cell);
                const isWrong = !isInitial && isWrongNumber(rowIndex, colIndex, cell);
                return (
                  <TouchableOpacity
                    key={`${rowIndex}-${colIndex}`}
                    style={[
                      styles.cell,
                      selectedCell?.row === rowIndex && selectedCell?.col === colIndex && styles.selectedCell,
                      isInitial && styles.initialCell,
                      isCorrect && styles.correctCell,
                      isWrong && styles.wrongCell,
                      (rowIndex + 1) % 3 === 0 && styles.bottomBorder,
                      (colIndex + 1) % 3 === 0 && styles.rightBorder,
                    ]}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                  >
                    <Text style={[
                      styles.cellText,
                      isCorrect && styles.correctCellText,
                      isWrong && styles.wrongCellText
                    ]}>
                      {cell !== 0 ? cell : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View style={styles.numpad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numButton}
              onPress={() => handleNumberInput(num)}
            >
              <Text style={styles.numButtonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {__DEV__ && (
          <TouchableOpacity 
            style={styles.debugButton} 
            onPress={handleAutofill}
          >
            <Text style={styles.debugButtonText}>Autofill (Debug)</Text>
          </TouchableOpacity>
        )}
        <AdBanner position="bottom" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 10,
  },
  board: {
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: '#e3f2fd',
  },
  initialCell: {
    backgroundColor: '#f8f9fa',
  },
  correctCell: {
    backgroundColor: '#a5d6a7',
  },
  correctCellText: {
    color: '#1b5e20',
  },
  wrongCell: {
    backgroundColor: '#ffcdd2',
  },
  wrongCellText: {
    color: '#b71c1c',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  rightBorder: {
    borderRightWidth: 2,
    borderRightColor: '#333',
  },
  cellText: {
    fontSize: 20,
    fontWeight: '600',
  },
  numpad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: '10%',
    gap: 10,
  },
  numButton: {
    width: '28%',
    aspectRatio: 1,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: '1%',
  },
  numButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  debugButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  debugButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;
