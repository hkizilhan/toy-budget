export function calculateNewBalance(balance: number, fromDate: number, incrementPerMonth: number): number {
    
    if (fromDate === 0) return 0
    
    const now = Date.now()
    const diffSeconds = Math.floor((now - fromDate) / 1000)
    const incrementAmountPerSecond = incrementPerMonth / 30 / 24 / 3600
    const diffBalance = parseFloat((diffSeconds * incrementAmountPerSecond).toFixed(5))
    
    return balance + diffBalance
}