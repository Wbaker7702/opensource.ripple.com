# Historical Queries

Historical queries allow you to retrieve past transactions, ledger states, and account data from the XRP Ledger. Understanding how to construct efficient queries is essential for working with historical data.

## Query Types

### Account Transaction History

Query all transactions associated with a specific account:

```json
{
  "id": 1,
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "ledger_index_min": -1,
  "ledger_index_max": -1,
  "binary": false,
  "count": false,
  "limit": 10
}
```

### Ledger-based Queries

Retrieve data from specific ledger versions:

```json
{
  "id": 2,
  "command": "ledger",
  "ledger_index": 85000000,
  "transactions": true,
  "expand": true
}
```

### Time Range Queries

Query data within a specific time range by converting dates to ledger indices:

1. Get ledger index for start date
2. Get ledger index for end date
3. Query transactions between those ledger indices

## Query Parameters

### Common Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ledger_index_min` | Integer | Lowest ledger index to search (use -1 for earliest available) |
| `ledger_index_max` | Integer | Highest ledger index to search (use -1 for most recent) |
| `limit` | Integer | Maximum number of results to return |
| `marker` | String | Pagination marker from previous response |
| `binary` | Boolean | Return results in binary format if true |
| `forward` | Boolean | If true, return results in chronological order (oldest first) |

### Filtering Options

Many historical query methods support additional filtering:

- **Transaction Type** - Filter by specific transaction types (Payment, OfferCreate, etc.)
- **Amount Ranges** - Filter transactions by amount thresholds
- **Transaction Status** - Include only successful or failed transactions
- **Account Filters** - Include or exclude specific accounts

## Query Patterns

### Pattern 1: Recent Transaction History

Get the most recent transactions for an account:

```json
{
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "ledger_index_min": -1,
  "ledger_index_max": -1,
  "limit": 50,
  "forward": false
}
```

### Pattern 2: Historical Range

Query transactions within a specific ledger range:

```json
{
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "ledger_index_min": 85000000,
  "ledger_index_max": 85100000,
  "limit": 100
}
```

### Pattern 3: Paginated Results

Handle large result sets with pagination:

```json
{
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "ledger_index_min": -1,
  "ledger_index_max": -1,
  "limit": 100,
  "marker": "1A2B3C4D5E6F7G8H9I0J..."
}
```

## Performance Considerations

### Efficient Querying

1. **Use Appropriate Limits** - Don't request more data than you need
2. **Specify Ledger Ranges** - Narrow down the search range when possible
3. **Use Pagination** - Process large result sets in chunks
4. **Cache Results** - Cache frequently accessed historical data
5. **Filter Early** - Apply filters at the query level when possible

### Avoiding Common Pitfalls

- **Don't request entire history** - Use date ranges or ledger ranges
- **Don't ignore pagination** - Always handle markers for large result sets
- **Don't make redundant queries** - Cache results when appropriate
- **Don't query too frequently** - Be mindful of rate limits

## Best Practices

1. **Start with Recent Data** - Query recent data first, then expand backward if needed
2. **Use Ledger Indices** - More efficient than date-based queries for large ranges
3. **Handle Pagination** - Always check for markers and continue queries as needed
4. **Error Handling** - Implement robust error handling for network issues
5. **Timeout Handling** - Set appropriate timeouts for long-running queries

## Example: Complete Account History

Here's an example of retrieving complete account history with pagination:

```javascript
async function getAccountHistory(account, limit = 100) {
  let marker = undefined;
  let allTransactions = [];
  let hasMore = true;

  while (hasMore) {
    const request = {
      command: "account_tx",
      account: account,
      ledger_index_min: -1,
      ledger_index_max: -1,
      limit: limit,
      forward: false
    };

    if (marker) {
      request.marker = marker;
    }

    const response = await client.request(request);
    allTransactions = allTransactions.concat(response.result.transactions);

    marker = response.result.marker;
    hasMore = !!marker;
  }

  return allTransactions;
}
```
