# ledger

The `ledger` method retrieves information about a specific historical ledger, including transactions, ledger entries, and metadata.

## Request Format

### WebSocket Request

```json
{
  "id": 1,
  "command": "ledger",
  "ledger_index": 85000000,
  "transactions": true,
  "expand": true,
  "owner_funds": false,
  "binary": false
}
```

### JSON-RPC Request

```json
{
  "method": "ledger",
  "params": [
    {
      "ledger_index": 85000000,
      "transactions": true,
      "expand": true,
      "owner_funds": false,
      "binary": false
    }
  ]
}
```

## Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ledger_index` | String/Integer | No | Ledger index number, "validated", "closed", "current", or "finalized". Default: "validated" |
| `ledger_hash` | String | No | Hash of a specific ledger (alternative to ledger_index) |
| `full` | Boolean | No | If true, return full ledger data including all transactions and entries. Default: false |
| `accounts` | Boolean | No | If true, return account state information. Default: false |
| `transactions` | Boolean | No | If true, return transaction list. Default: false |
| `expand` | Boolean | No | If true, expand transaction details (only if transactions is true). Default: false |
| `owner_funds` | Boolean | No | If true, include owner_funds field in transactions (only if expand is true). Default: false |
| `binary` | Boolean | No | If true, return data in binary format. Default: false |

## Response Format

### Successful Response

```json
{
  "id": 1,
  "result": {
    "ledger": {
      "account_hash": "B2584E432A321B22F7E60A27882871D8E3B55A45B3C62E5435D05D8E6E7F9A1B",
      "close_time": 752927012,
      "close_time_human": "2024-01-15T10:30:12.000Z",
      "close_time_resolution": 10,
      "closed": true,
      "ledger_hash": "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F",
      "ledger_index": 85000000,
      "parent_close_time": 752927008,
      "parent_hash": "0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F",
      "total_coins": "99999999999999999",
      "transaction_hash": "2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G",
      "transactions": [
        {
          "Account": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
          "Amount": "1000000",
          "Destination": "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
          "Fee": "12",
          "Flags": 2147483648,
          "Sequence": 12345,
          "TransactionType": "Payment",
          "hash": "3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H"
        }
      ]
    },
    "ledger_index": 85000000,
    "validated": true
  },
  "status": "success",
  "type": "response"
}
```

## Response Fields

### Ledger Object

| Field | Type | Description |
|-------|------|-------------|
| `ledger_index` | Integer | The ledger index number |
| `ledger_hash` | String | Hash of this ledger |
| `parent_hash` | String | Hash of the previous ledger |
| `account_hash` | String | Hash of the account state tree |
| `transaction_hash` | String | Hash of the transaction tree |
| `close_time` | Integer | Close time in seconds since Ripple Epoch |
| `close_time_human` | String | Close time in ISO 8601 format |
| `close_time_resolution` | Integer | Resolution of close time (typically 1-10 seconds) |
| `closed` | Boolean | Whether this ledger is closed |
| `total_coins` | String | Total XRP in existence (in drops) |
| `transactions` | Array | Array of transactions (if requested) |

### Response Metadata

| Field | Type | Description |
|-------|------|-------------|
| `ledger_index` | Integer | The ledger index that was queried |
| `validated` | Boolean | Whether the ledger is validated |

## Usage Examples

### Example 1: Basic Ledger Information

Get basic information about a specific ledger:

```json
{
  "command": "ledger",
  "ledger_index": 85000000
}
```

### Example 2: Ledger with Transactions

Get ledger information including transaction list:

```json
{
  "command": "ledger",
  "ledger_index": 85000000,
  "transactions": true
}
```

### Example 3: Expanded Transaction Details

Get ledger with expanded transaction details:

```json
{
  "command": "ledger",
  "ledger_index": 85000000,
  "transactions": true,
  "expand": true
}
```

### Example 4: Full Ledger Data

Get complete ledger data including all accounts and transactions:

```json
{
  "command": "ledger",
  "ledger_index": 85000000,
  "full": true
}
```

### Example 5: Query by Ledger Hash

Query a ledger by its hash:

```json
{
  "command": "ledger",
  "ledger_hash": "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F"
}
```

### Example 6: Current Validated Ledger

Get the current validated ledger:

```json
{
  "command": "ledger",
  "ledger_index": "validated"
}
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
    "command": "ledger",
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

### Finding Ledger Close Time

Use `ledger` to get the close time for a specific ledger index:

```json
{
  "command": "ledger",
  "ledger_index": 85000000
}
```

Response includes `close_time` field which can be used for time-based queries.

### Getting Transaction List

Retrieve all transactions from a specific ledger:

```json
{
  "command": "ledger",
  "ledger_index": 85000000,
  "transactions": true,
  "expand": true
}
```

### Historical State Analysis

Get complete ledger state at a specific point in time:

```json
{
  "command": "ledger",
  "ledger_index": 85000000,
  "full": true
}
```

## Best Practices

1. **Use Specific Ledger Indices** - When possible, use specific indices rather than "current"
2. **Minimize Full Requests** - Use `full: true` sparingly as it returns large amounts of data
3. **Cache Results** - Cache ledger metadata for frequently accessed ledgers
4. **Handle Errors** - Implement error handling for ledgers that may not be available
5. **Verify Validation** - Check `validated` field to ensure ledger is validated

## Related Documentation

- [Historical Queries Concepts](../concepts/historical-queries.md)
- [Time and Ledgers](../concepts/time-and-ledgers.md)
- [ledger_data](ledger_data.md) - Query specific ledger entries
- [XRPL.org ledger Documentation](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/ledger-methods/ledger/)
