function Score({ score, highScore }) {
  return (
  <div className="score">
    <h2>Score: {score}</h2>
    <h3>High Score: {highScore}</h3>
  </div>

  );
}

export default Score;