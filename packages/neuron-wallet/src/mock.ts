export const transactions = Array.from({
  length: 200,
}).map(() => ({
  date: new Date(),
  value: Math.random(),
  hash: Math.round(Math.random() * 10000000000000000),
}))

export const transactionCount = 500

export default {
  transactions,
  transactionCount,
}
