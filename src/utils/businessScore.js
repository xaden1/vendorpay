export const calculateBusinessScore = (transactions, operations) => {
  if (!transactions?.length) return { score: 0, grade: 'F', breakdown: {} };

  const now = new Date();

  const received = operations.filter(op => op.type === 'payment' && op.to).length;
  const volumeScore = Math.min(30, received * 3);

  const recentDays = new Set(
    transactions
      .filter(tx => (now - new Date(tx.created_at)) / 86400000 <= 30)
      .map(tx => tx.created_at.split('T')[0])
  ).size;
  const consistencyScore = Math.min(25, recentDays * 2);

  const uniqueCounterparties = new Set(
    operations.filter(op => op.from).map(op => op.from)
  ).size;
  const diversityScore = Math.min(25, uniqueCounterparties * 2.5);

  const firstTx = transactions[transactions.length - 1];
  const daysOld = firstTx
    ? (now - new Date(firstTx.created_at)) / 86400000
    : 0;
  const tenureScore = Math.min(20, Math.floor(daysOld / 3));

  const total = Math.round(volumeScore + consistencyScore + diversityScore + tenureScore);

  const grade =
    total >= 90 ? 'A+' :
    total >= 80 ? 'A' :
    total >= 70 ? 'B' :
    total >= 60 ? 'C' :
    total >= 40 ? 'D' : 'F';

  return {
    score: total,
    grade,
    breakdown: {
      volume: { score: volumeScore, max: 30, label: 'Payment Volume' },
      consistency: { score: consistencyScore, max: 25, label: 'Consistency' },
      diversity: { score: diversityScore, max: 25, label: 'Customer Reach' },
      tenure: { score: tenureScore, max: 20, label: 'Business Age' },
    }
  };
};
