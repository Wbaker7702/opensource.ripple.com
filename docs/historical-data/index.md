---
blurb: Query and search historical ledger data, transactions, and account states
labels:
  - Historical Data
  - Search
  - Queries
status: enabled
---
# Historical Data Search

Historical data search enables you to query, filter, and retrieve historical ledger data, transactions, and account states from the XRP Ledger. This functionality is essential for auditing, compliance reporting, analytics, debugging, and reconciliation tasks.

## Overview

The XRP Ledger maintains a complete historical record of all transactions and ledger states. Historical data search provides APIs and methods to efficiently access this data, allowing you to:

- **Query transaction history** - Retrieve all transactions for an account or matching specific criteria
- **Access historical ledgers** - Get ledger data and entries from any past ledger version
- **Track account changes** - Monitor account balance and state changes over time
- **Search by time** - Query data using date ranges and timestamps
- **Filter and paginate** - Efficiently handle large result sets with filtering and pagination

## Key Features

### Time-based Queries

Convert between ledger indices and timestamps to query data by specific dates or time ranges. This enables flexible searches such as "all transactions in January 2024" or "account state at a specific point in time."

### Flexible Filtering

Filter historical data by:
- Account addresses
- Transaction types
- Date/time ranges
- Ledger index ranges
- Transaction status
- Amount ranges
- And more

### Efficient Pagination

Handle large result sets efficiently using pagination markers, allowing you to retrieve data in manageable chunks without overwhelming your application or the server.

## Common Use Cases

- **Transaction Auditing** - Review complete transaction history for compliance
- **Analytics** - Analyze transaction patterns and trends over time
- **Account Reconciliation** - Match external records with ledger history
- **Debugging** - Investigate past transactions and ledger states
- **Reporting** - Generate historical reports for stakeholders

## Concepts

[Historical Queries](concepts/historical-queries.md) - Learn about querying historical data and common patterns

[Time and Ledgers](concepts/time-and-ledgers.md) - Understand time conversion and ledger indexing

[Pagination](concepts/pagination.md) - Best practices for handling large result sets

## Reference

[Historical Data Reference](reference/historical-reference.md) - Complete API reference for historical data methods

## Related Documentation

- [XRP Ledger Documentation](https://xrpl.org/docs.html) - Main XRP Ledger documentation
- [API Conventions](https://xrpl.org/docs/references/http-websocket-apis/api-conventions/) - Standard API formatting and conventions
