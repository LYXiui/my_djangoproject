import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, List, ListItem } from '@mui/material';

function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outlined"
      onClick={onSquareClick}
      sx={{ width: '100px', height: '100px', fontSize: '2rem', fontWeight: 'bold', borderColor: '#ccc' }}
    >
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? `贏家是: ${winner}` : squares.every(s => s !== null) ? '平手！' : `下一位玩家: ${xIsNext ? 'X' : 'O'}`;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{status}</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px' }}>
        {squares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
        ))}
      </Box>
    </Box>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const xIsNext = currentStep % 2 === 0;
  const currentSquares = history[currentStep];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Ex13: React 井字棋 (OX 遊戲)
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Paper elevation={3} sx={{ p: 4, bgcolor: '#fafafa' }}>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, maxHeight: '300px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>歷史紀錄</Typography>
            <List>
              {history.map((_, move) => (
                <ListItem key={move} disablePadding sx={{ mb: 1 }}>
                  <Button variant="contained" color="secondary" size="small" fullWidth onClick={() => setCurrentStep(move)}>
                    {move > 0 ? `回到第 # ${move} 步` : '回到遊戲開始'}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function calculateWinner(squares) {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}
