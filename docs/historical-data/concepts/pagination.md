# Pagination

When querying historical data, results can be very large. Pagination allows you to retrieve data in manageable chunks, improving performance and reducing server load.

## How Pagination Works

### Marker-based Pagination

XRP Ledger APIs use **marker-based pagination**:
- Each response includes a `marker` field if more results are available
- Pass the marker from the previous response to get the next page
- When no marker is returned, you've reached the end of results

### Basic Pagination Flow

```
Request 1 → Response 1 (with marker)
           ↓
Request 2 (with marker) → Response 2 (with marker)
           ↓
Request 3 (with marker) → Response 3 (no marker - done)
```

## Pagination Parameters

### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | Integer | Maximum number of results per page (default varies by method) |
| `marker` | String | Opaque marker from previous response to get next page |

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `marker` | String | Marker for the next page (omitted if no more results) |
| `transactions` | Array | Array of results for current page |

## Pagination Examples

### Example 1: Simple Pagination

```json
// First request
{
  "id": 1,
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "limit": 100
}

// Response includes marker
{
  "id": 1,
  "result": {
    "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
    "ledger_index_min": 85000000,
    "ledger_index_max": 85100000,
    "transactions": [...],
    "marker": "1A2B3C4D5E6F7G8H9I0J..."
  }
}

// Second request with marker
{
  "id": 2,
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "limit": 100,
  "marker": "1A2B3C4D5E6F7G8H9I0J..."
}
```

### Example 2: Complete Pagination Loop

```javascript
async function getAllTransactions(account) {
  let allTransactions = [];
  let marker = undefined;
  let hasMore = true;

  while (hasMore) {
    const request = {
      command: "account_tx",
      account: account,
      limit: 100
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

## Choosing Page Size

### Factors to Consider

1. **Network Latency** - Smaller pages = more requests but faster individual responses
2. **Memory Usage** - Larger pages = more memory per request
3. **Server Load** - Very large pages may timeout or be rejected
4. **Use Case** - Real-time display may prefer smaller pages

### Recommended Limits

- **Small queries** (< 1000 results): Use limit of 100-200
- **Medium queries** (1000-10000 results): Use limit of 200-500
- **Large queries** (> 10000 results): Use limit of 500-1000

**Note**: Maximum limits vary by API method. Check individual method documentation.

## Forward vs Backward Pagination

### Forward Pagination (`forward: true`)

- Returns results in chronological order (oldest first)
- Use when you want to process history from the beginning
- Good for complete historical scans

```json
{
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "forward": true,
  "limit": 100
}
```

### Backward Pagination (`forward: false` or omitted)

- Returns results in reverse chronological order (newest first)
- Use when you want recent transactions first
- Good for displaying recent activity

```json
{
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "forward": false,
  "limit": 100
}
```

## Error Handling

### Handling Pagination Errors

```javascript
async function paginatedQuery(request, maxRetries = 3) {
  let marker = undefined;
  let allResults = [];
  let retries = 0;

  while (true) {
    try {
      const currentRequest = { ...request };
      if (marker) {
        currentRequest.marker = marker;
      }

      const response = await client.request(currentRequest);
      allResults = allResults.concat(response.result.transactions || []);

      marker = response.result.marker;
      if (!marker) {
        break; // No more results
      }

      retries = 0; // Reset retry counter on success
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        throw new Error(`Pagination failed after ${maxRetries} retries: ${error.message}`);
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }

  return allResults;
}
```

## Best Practices

1. **Always Check for Marker** - Don't assume you have all results
2. **Handle Interruptions** - Save markers to resume interrupted queries
3. **Respect Rate Limits** - Add delays between pagination requests if needed
4. **Monitor Progress** - Log progress for long-running pagination
5. **Validate Results** - Ensure no duplicates or missing data
6. **Use Appropriate Limits** - Balance between request count and page size
7. **Handle Timeouts** - Implement timeout handling for long queries

## Advanced Patterns

### Pattern 1: Resume Interrupted Query

```javascript
function savePaginationState(account, marker) {
  localStorage.setItem(`pagination_${account}`, marker);
}

function loadPaginationState(account) {
  return localStorage.getItem(`pagination_${account}`);
}

async function resumeQuery(account) {
  const savedMarker = loadPaginationState(account);
  // Continue from saved marker
}
```

### Pattern 2: Parallel Pagination

For very large queries, you can split the ledger range and query in parallel:

```javascript
async function parallelQuery(account, ledgerRanges) {
  const promises = ledgerRanges.map(range => 
    queryAccountTx(account, range.min, range.max)
  );
  const results = await Promise.all(promises);
  return results.flat();
}
```

### Pattern 3: Progress Tracking

```javascript
async function paginatedQueryWithProgress(account, onProgress) {
  let allTransactions = [];
  let marker = undefined;
  let pageCount = 0;

  while (true) {
    const request = {
      command: "account_tx",
      account: account,
      limit: 100
    };
    if (marker) request.marker = marker;

    const response = await client.request(request);
    const transactions = response.result.transactions || [];
    allTransactions = allTransactions.concat(transactions);
    pageCount++;

    onProgress({
      page: pageCount,
      totalTransactions: allTransactions.length,
      hasMore: !!response.result.marker
    });

    marker = response.result.marker;
    if (!marker) break;
  }

  return allTransactions;
}
```
