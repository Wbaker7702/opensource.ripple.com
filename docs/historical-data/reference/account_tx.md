# account_tx

The `account_tx` method retrieves historical transactions for a specific account. This is one of the primary methods for querying account transaction history.

## Request Format

### WebSocket Request

```json
{
  "id": 1,
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "ledger_index_min": -1,
  "ledger_index_max": -1,
  "binary": false,
  "forward": false,
  "limit": 100
}
```

### JSON-RPC Request

```json
{
  "method": "account_tx",
  "params": [
    {
      "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
      "ledger_index_min": -1,
      "ledger_index_max": -1,
      "binary": false,
      "forward": false,
      "limit": 100
    }
  ]
}
```

## Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `account` | String | Yes | The account address to query |
| `ledger_index_min` | Integer | No | Lowest ledger index to search. Use -1 to start from earliest available. Default: -1 |
| `ledger_index_max` | Integer | No | Highest ledger index to search. Use -1 to search up to most recent. Default: -1 |
| `ledger_hash` | String | No | Hash of a specific ledger (alternative to ledger_index_min/max) |
| `ledger_index` | String/Integer | No | Single ledger index or "validated", "closed", "current" |
| `binary` | Boolean | No | If true, return transactions in binary format. Default: false |
| `forward` | Boolean | No | If true, return results in chronological order (oldest first). Default: false (newest first) |
| `limit` | Integer | No | Maximum number of transactions to return. Default: varies by server |
| `marker` | String | No | Pagination marker from previous response |

## Response Format

### Successful Response

```json
{
  "id": 1,
  "result": {
    "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
    "ledger_index_min": 85000000,
    "ledger_index_max": 85100000,
    "limit": 100,
    "marker": "1A2B3C4D5E6F7G8H9I0J...",
    "transactions": [
      {
        "ledger_index": 85100000,
        "meta": {
          "AffectedNodes": [...],
          "TransactionIndex": 0,
          "TransactionResult": "tesSUCCESS"
        },
        "tx": {
          "Account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
          "Amount": "1000000",
          "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
          "Fee": "12",
          "Flags": 2147483648,
          "Sequence": 12345,
          "SigningPubKey": "03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB",
          "TransactionType": "Payment",
          "TxnSignature": "...",
          "date": 752927012,
          "hash": "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F"
        },
        "validated": true
      }
    ]
  },
  "status": "success",
  "type": "response"
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `account` | String | The account address that was queried |
| `ledger_index_min` | Integer | The lowest ledger index included in results |
| `ledger_index_max` | Integer | The highest ledger index included in results |
| `limit` | Integer | The limit value used for this query |
| `marker` | String | Pagination marker for next page (omitted if no more results) |
| `transactions` | Array | Array of transaction objects |

### Transaction Object Fields

Each transaction in the `transactions` array contains:

| Field | Type | Description |
|-------|------|-------------|
| `ledger_index` | Integer | The ledger index that included this transaction |
| `meta` | Object | Transaction metadata (omitted if `binary` is true) |
| `tx` | Object | Transaction data (omitted if `binary` is true) |
| `tx_blob` | String | Binary transaction data (only if `binary` is true) |
| `meta_blob` | String | Binary metadata (only if `binary` is true) |
| `validated` | Boolean | Whether the transaction is validated |

## Usage Examples

### Example 1: Recent Transactions

Get the 50 most recent transactions for an account:

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

### Example 2: Historical Range

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

### Example 3: Pagination

Get next page of results:

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

### Example 4: Forward Chronological Order

Get transactions in chronological order (oldest first):

```json
{
  "command": "account_tx",
  "account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  "ledger_index_min": -1,
  "ledger_index_max": -1,
  "forward": true,
  "limit": 100
}
```

## Error Responses

### Invalid Account

```json
{
  "id": 1,
  "error": "invalidParams",
  "error_message": "Invalid field 'account'.",
  "error_code": 34,
  "request": {
    "command": "account_tx",
    "account": "invalid_account"
  },
  "status": "error",
  "type": "response"
}
```

### Invalid Ledger Range

```json
{
  "id": 1,
  "error": "invalidParams",
  "error_message": "ledger_index_min must be less than ledger_index_max",
  "error_code": 34,
  "status": "error",
  "type": "response"
}
```

## Possible Errors

- `invalidParams` - Invalid request parameters
- `actNotFound` - Account not found
- `lgrNotFound` - Ledger not found (if specific ledger requested)
- `noPermission` - No permission to access historical data (server-specific)

## Best Practices

1. **Use Appropriate Limits** - Set `limit` to reasonable values (100-1000)
2. **Specify Ledger Ranges** - Narrow ranges improve performance
3. **Handle Pagination** - Always check for `marker` and continue if present
4. **Cache Results** - Cache frequently accessed transaction history
5. **Error Handling** - Implement robust error handling for network issues

## Related Documentation

- [Historical Queries Concepts](../concepts/historical-queries.md)
- [Pagination Guide](../concepts/pagination.md)
- [XRPL.org account_tx Documentation](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/account-methods/account_tx/)
