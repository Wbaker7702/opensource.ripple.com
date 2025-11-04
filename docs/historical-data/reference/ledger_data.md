# ledger_data

The `ledger_data` method retrieves ledger entries from a specific historical ledger. This method is useful for querying account states, trust lines, offers, and other ledger objects at a specific point in time.

## Request Format

### WebSocket Request

```json
{
  "id": 1,
  "command": "ledger_data",
  "ledger_index": 85000000,
  "binary": false,
  "limit": 100
}
```

### JSON-RPC Request

```json
{
  "method": "ledger_data",
  "params": [
    {
      "ledger_index": 85000000,
      "binary": false,
      "limit": 100
    }
  ]
}
```

## Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ledger_index` | String/Integer | No | Ledger index number, "validated", "closed", or "current". Default: "validated" |
| `ledger_hash` | String | No | Hash of a specific ledger (alternative to ledger_index) |
| `binary` | Boolean | No | If true, return entries in binary format. Default: false |
| `limit` | Integer | No | Maximum number of entries to return. Default: varies by server |
| `marker` | String | No | Pagination marker from previous response |

## Response Format

### Successful Response

```json
{
  "id": 1,
  "result": {
    "ledger_index": 85000000,
    "ledger_hash": "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F",
    "state": [
      {
        "data": {
          "Account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
          "Balance": "1000000000",
          "Flags": 0,
          "LedgerEntryType": "AccountRoot",
          "OwnerCount": 0,
          "PreviousTxnID": "2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G",
          "PreviousTxnLgrSeq": 84999999,
          "Sequence": 12345,
          "index": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8"
        },
        "index": "13F1A95D7AAB7108D5CE7EEAF504B2894B8C674E6D68499076441C4837282BF8"
      }
    ],
    "marker": "1A2B3C4D5E6F7G8H9I0J..."
  },
  "status": "success",
  "type": "response"
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `ledger_index` | Integer | The ledger index that was queried |
| `ledger_hash` | String | Hash of the ledger |
| `state` | Array | Array of ledger entry objects |
| `marker` | String | Pagination marker for next page (omitted if no more results) |

### Ledger Entry Object

Each entry in the `state` array contains:

| Field | Type | Description |
|-------|------|-------------|
| `index` | String | The ledger index of this entry |
| `data` | Object | The ledger entry data (omitted if `binary` is true) |
| `data_binary` | String | Binary entry data (only if `binary` is true) |

## Ledger Entry Types

Common ledger entry types you may encounter:

- `AccountRoot` - Account information
- `RippleState` - Trust line between two accounts
- `Offer` - Order book offer
- `DirectoryNode` - Directory listing
- `Escrow` - Escrow object
- `PayChannel` - Payment channel
- `Check` - Check object
- `DepositPreauth` - Deposit preauthorization
- `Ticket` - Ticket object
- `NFToken` - NFT object
- `NFTokenPage` - NFT page
- `AMM` - Automated Market Maker pool
- `Bridge` - Cross-chain bridge

## Usage Examples

### Example 1: Basic Ledger Entries

Get ledger entries from a specific ledger:

```json
{
  "command": "ledger_data",
  "ledger_index": 85000000,
  "limit": 100
}
```

### Example 2: Pagination

Get next page of ledger entries:

```json
{
  "command": "ledger_data",
  "ledger_index": 85000000,
  "limit": 100,
  "marker": "1A2B3C4D5E6F7G8H9I0J..."
}
```

### Example 3: Binary Format

Get ledger entries in binary format:

```json
{
  "command": "ledger_data",
  "ledger_index": 85000000,
  "binary": true,
  "limit": 100
}
```

### Example 4: Query by Ledger Hash

Query ledger entries by ledger hash:

```json
{
  "command": "ledger_data",
  "ledger_hash": "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F"
}
```

### Example 5: Current Validated Ledger

Get entries from the current validated ledger:

```json
{
  "command": "ledger_data",
  "ledger_index": "validated",
  "limit": 1000
}
```

## Filtering Entries

While `ledger_data` returns all entries, you can filter client-side:

```javascript
// Filter for AccountRoot entries
const accountEntries = response.result.state.filter(entry => 
  entry.data.LedgerEntryType === "AccountRoot"
);

// Filter for specific account
const accountData = response.result.state.find(entry => 
  entry.data.Account === "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH"
);
```

## Error Responses

### Ledger Not Found

```json
{
  "id": 1,
  "error": "lgrNotFound",
  "error_message": "ledgerNotFound",
  "error_code": 20,
  "request": {
    "command": "ledger_data",
    "ledger_index": 999999999999
  },
  "status": "error",
  "type": "response"
}
```

### Invalid Parameters

```json
{
  "id": 1,
  "error": "invalidParams",
  "error_message": "Invalid field 'ledger_index'.",
  "error_code": 34,
  "status": "error",
  "type": "response"
}
```

## Possible Errors

- `lgrNotFound` - Ledger not found (ledger index too high or hash invalid)
- `invalidParams` - Invalid request parameters
- `noPermission` - No permission to access historical data (server-specific)

## Use Cases

### Account State at Specific Ledger

Get account state at a specific ledger index:

```json
{
  "command": "ledger_data",
  "ledger_index": 85000000,
  "limit": 1000
}
```

Then filter for the specific account.

### Trust Line Analysis

Analyze trust lines at a specific point in time:

```json
{
  "command": "ledger_data",
  "ledger_index": 85000000,
  "limit": 1000
}
```

Filter for `RippleState` entries.

### Complete Ledger Snapshot

Get a complete snapshot of ledger state (requires pagination):

```javascript
async function getCompleteLedgerState(ledgerIndex) {
  let allEntries = [];
  let marker = undefined;

  while (true) {
    const request = {
      command: "ledger_data",
      ledger_index: ledgerIndex,
      limit: 1000
    };
    if (marker) request.marker = marker;

    const response = await client.request(request);
    allEntries = allEntries.concat(response.result.state);

    marker = response.result.marker;
    if (!marker) break;
  }

  return allEntries;
}
```

## Best Practices

1. **Use Appropriate Limits** - Set reasonable `limit` values (typically 100-1000)
2. **Handle Pagination** - Always check for `marker` and continue if present
3. **Filter Client-Side** - Filter entries client-side for specific types
4. **Cache Results** - Cache frequently accessed ledger entries
5. **Consider Alternative Methods** - Use `ledger_entry` for specific entries when possible
6. **Monitor Performance** - Large ledger queries can be slow; monitor performance

## Related Documentation

- [Historical Queries Concepts](../concepts/historical-queries.md)
- [Pagination Guide](../concepts/pagination.md)
- [ledger](ledger.md) - Get ledger metadata
- [XRPL.org ledger_data Documentation](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger_data/)
