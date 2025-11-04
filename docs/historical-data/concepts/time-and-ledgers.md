# Time and Ledgers

Understanding the relationship between time and ledger indices is crucial for querying historical data. This guide explains how to work with timestamps, dates, and ledger indices.

## Ledger Index and Time

Each ledger in the XRP Ledger has:
- **Ledger Index** - A sequential number identifying the ledger
- **Close Time** - The timestamp when the ledger was closed (in seconds since Ripple Epoch)
- **Close Time Resolution** - The resolution of the close time (typically 1-10 seconds)

## Time Conversion

### Ripple Epoch

The XRP Ledger uses the **Ripple Epoch** (January 1, 2000, 00:00:00 UTC) as its time reference point. Timestamps are represented as:
- **Unix seconds** - Seconds since Ripple Epoch (January 1, 2000)
- **Ripple Epoch offset** - To convert to Unix timestamp: add 946684800

### Converting Between Formats

#### Ledger Index to Timestamp

```json
{
  "id": 1,
  "command": "ledger",
  "ledger_index": 85000000
}
```

Response includes `close_time` field (in seconds since Ripple Epoch).

#### Timestamp to Ledger Index

Use `ledger` command with `ledger_index` set to "validated" and check close times:

```json
{
  "id": 2,
  "command": "ledger",
  "ledger_index": "validated",
  "ledger_hash": "..."
}
```

Or use the `ledger_closed` method with time-based filtering.

## Date Range Queries

### Finding Ledger Indices for a Date Range

1. **Get current ledger** to establish baseline
2. **Estimate ledger index** based on approximate time (ledgers close every ~3-5 seconds)
3. **Query specific ledgers** to find exact match
4. **Use found indices** for historical queries

### Example: Query by Date Range

```javascript
// Convert dates to Ripple Epoch seconds
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-01-31');

const rippleEpoch = 946684800; // Seconds offset
const startTime = Math.floor(startDate.getTime() / 1000) - rippleEpoch;
const endTime = Math.floor(endDate.getTime() / 1000) - rippleEpoch;

// Estimate ledger indices (approximate: 1 ledger per 4 seconds)
const estimatedLedgerRate = 4; // seconds per ledger
const currentLedger = 85000000; // Example current ledger
const currentTime = Math.floor(Date.now() / 1000) - rippleEpoch;

const startLedger = currentLedger - Math.floor((currentTime - startTime) / estimatedLedgerRate);
const endLedger = currentLedger - Math.floor((currentTime - endTime) / estimatedLedgerRate);

// Query with estimated range
const request = {
  command: "account_tx",
  account: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  ledger_index_min: startLedger,
  ledger_index_max: endLedger
};
```

## Ledger Close Times

### Understanding Close Time Resolution

Ledger close times have a resolution of 1-10 seconds. This means:
- Close times are rounded to the nearest resolution interval
- Multiple ledgers may have the same close time
- Exact timestamp matching may require checking multiple ledgers

### Querying by Close Time

When querying ledgers by close time, be aware that:
- Close times are approximate
- Use ranges rather than exact matches
- Consider resolution when filtering

## Time Zones

### UTC Standard

All XRP Ledger timestamps are in **UTC**. When converting:
- Always use UTC for calculations
- Convert to local time only for display
- Be consistent with timezone handling

### Example Conversions

```javascript
// Unix timestamp to Ripple Epoch seconds
function unixToRippleEpoch(unixTimestamp) {
  return unixTimestamp - 946684800;
}

// Ripple Epoch seconds to Unix timestamp
function rippleEpochToUnix(rippleTimestamp) {
  return rippleTimestamp + 946684800;
}

// JavaScript Date to Ripple Epoch seconds
function dateToRippleEpoch(date) {
  return Math.floor(date.getTime() / 1000) - 946684800;
}

// Ripple Epoch seconds to JavaScript Date
function rippleEpochToDate(rippleTimestamp) {
  return new Date((rippleTimestamp + 946684800) * 1000);
}
```

## Best Practices

1. **Use Ledger Indices for Queries** - More efficient than time-based queries
2. **Cache Ledger-Time Mappings** - Store known ledger indices and their close times
3. **Account for Resolution** - Use ranges when querying by time
4. **Handle Edge Cases** - Account for ledger gaps or irregular close times
5. **Validate Results** - Verify that results match expected time ranges

## Common Patterns

### Pattern 1: Get Ledger for Specific Time

```json
{
  "id": 1,
  "command": "ledger",
  "ledger_index": "closed",
  "ledger_hash": "..."
}
```

Then check `close_time` and iterate if needed.

### Pattern 2: Find Ledger Range for Date Range

1. Query recent ledger to get current index and time
2. Calculate approximate ledger indices for dates
3. Query specific ledgers to verify close times
4. Adjust range based on actual close times

### Pattern 3: Time-based Filtering

Combine ledger index queries with time validation:

```javascript
async function getTransactionsInDateRange(account, startDate, endDate) {
  // Convert dates to Ripple Epoch
  const startTime = dateToRippleEpoch(startDate);
  const endTime = dateToRippleEpoch(endDate);
  
  // Get approximate ledger range
  const ledgerRange = estimateLedgerRange(startTime, endTime);
  
  // Query transactions
  const transactions = await queryAccountTx(account, ledgerRange);
  
  // Filter by actual close times
  return transactions.filter(tx => {
    const closeTime = tx.ledger_index; // Get from ledger
    return closeTime >= startTime && closeTime <= endTime;
  });
}
```
