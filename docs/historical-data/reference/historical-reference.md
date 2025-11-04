# Historical Data API Reference

This reference documents the API methods available for querying historical data from the XRP Ledger.

## Overview

Historical data APIs allow you to retrieve past transactions, ledger states, and account information. These methods support filtering, pagination, and time-based queries.

## Available Methods

### Account Transaction History

- [account_tx](account_tx.md) - Retrieve transaction history for a specific account

### Ledger Queries

- [ledger](ledger.md) - Retrieve data from a specific historical ledger
- [ledger_data](ledger_data.md) - Query ledger entries from historical ledgers

### Transaction Queries

- [tx](https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/transaction-methods/tx/) - Retrieve a specific transaction by hash (see XRPL.org for details)

## Common Parameters

Many historical data methods share common parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `ledger_index_min` | Integer | Lowest ledger index to search (use -1 for earliest available) |
| `ledger_index_max` | Integer | Highest ledger index to search (use -1 for most recent) |
| `ledger_hash` | String | Hash of a specific ledger (alternative to ledger_index) |
| `ledger_index` | String/Integer | Ledger index or "validated", "closed", "current" |
| `limit` | Integer | Maximum number of results to return |
| `marker` | String | Pagination marker from previous response |
| `binary` | Boolean | Return results in binary format if true |
| `forward` | Boolean | If true, return results in chronological order |

## Response Format

All historical data methods follow the [standard API response format](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/response-formatting) with:

- `result` - Contains the query results
- `status` - Response status ("success" or "error")
- `type` - Response type ("response")
- `id` - Request ID (echoed from request)

## Pagination

Most historical data methods support pagination:

1. Initial request without `marker`
2. Response includes `marker` if more results available
3. Subsequent requests include `marker` to get next page
4. When no `marker` is returned, all results have been retrieved

See [Pagination Guide](../concepts/pagination.md) for detailed information.

## Time-based Queries

To query by date/time:

1. Convert dates to approximate ledger indices
2. Query specific ledgers to find exact matches
3. Use found ledger indices for historical queries

See [Time and Ledgers Guide](../concepts/time-and-ledgers.md) for details.

## Best Practices

1. **Use Appropriate Limits** - Set reasonable `limit` values (typically 100-1000)
2. **Specify Ledger Ranges** - Narrow search ranges when possible
3. **Handle Pagination** - Always check for and use markers
4. **Cache Results** - Cache frequently accessed historical data
5. **Error Handling** - Implement robust error handling
6. **Rate Limiting** - Be mindful of API rate limits

## Related Documentation

- [Historical Queries Concepts](../concepts/historical-queries.md)
- [Time and Ledgers](../concepts/time-and-ledgers.md)
- [Pagination Guide](../concepts/pagination.md)
- [XRPL.org API Reference](https://xrpl.org/docs/references/http-websocket-apis/)
