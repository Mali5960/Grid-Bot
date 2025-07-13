import { useState } from "react";

export default function Home() {
  const [price, setPrice] = useState(55);
  const [gridSize, setGridSize] = useState(0.2);
  const [upperPercent, setUpperPercent] = useState(4);
  const [lowerPercent, setLowerPercent] = useState(1.5);
  const [sharesPerGrid, setSharesPerGrid] = useState(20);
  const [targetProfitPercent, setTargetProfitPercent] = useState(0.4);
  const [capital, setCapital] = useState(80000);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const lowerPrice = price * (1 - lowerPercent / 100);
    const upperPrice = price * (1 + upperPercent / 100);
    const gridCount = Math.floor((upperPrice - lowerPrice) / gridSize);
    const totalShares = gridCount * sharesPerGrid;
    const totalCost = totalShares * price;
    const targetProfit = capital * (targetProfitPercent / 100);
    const profitPerGrid = sharesPerGrid * gridSize;
    const requiredGrids = Math.ceil(targetProfit / profitPerGrid);

    setResult({
      gridCount,
      totalShares,
      totalCost: totalCost.toFixed(2),
      targetProfit: targetProfit.toFixed(2),
      profitPerGrid: profitPerGrid.toFixed(2),
      requiredGrids,
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Grid Bot Hesaplayıcı</h1>

      <label>Hisse Fiyatı:</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <label>Grid Aralığı (TL):</label>
      <input
        type="number"
        step="0.01"
        value={gridSize}
        onChange={(e) => setGridSize(Number(e.target.value))}
      />

      <label>Üst Emir Yüzdesi (%):</label>
      <input
        type="number"
        step="0.1"
        value={upperPercent}
        onChange={(e) => setUpperPercent(Number(e.target.value))}
      />

      <label>Alt Emir Yüzdesi (%):</label>
      <input
        type="number"
        step="0.1"
        value={lowerPercent}
        onChange={(e) => setLowerPercent(Number(e.target.value))}
      />

      <label>Grid Başı Adet:</label>
      <input
        type="number"
        value={sharesPerGrid}
        onChange={(e) => setSharesPerGrid(Number(e.target.value))}
      />

      <label>Hedef Kâr (%):</label>
      <input
        type="number"
        step="0.01"
        value={targetProfitPercent}
        onChange={(e) => setTargetProfitPercent(Number(e.target.value))}
      />

      <label>Toplam Bakiye (TL):</label>
      <input
        type="number"
        value={capital}
        onChange={(e) => setCapital(Number(e.target.value))}
      />

      <button onClick={calculate}>Hesapla</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>📊 Grid Sayısı: {result.gridCount}</p>
          <p>📈 Toplam Adet: {result.totalShares}</p>
          <p>💸 Toplam Maliyet: {result.totalCost} TL</p>
          <p>🎯 Hedef Kâr: {result.targetProfit} TL</p>
          <p>💰 Grid Başına Kâr: {result.profitPerGrid} TL</p>
          <p>✅ Gereken Grid Hareketi: {result.requiredGrids}</p>
        </div>
      )}
    </div>
  );
}
