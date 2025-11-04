# Historical Data Search Documentation

This directory contains comprehensive documentation for querying and searching historical data from the XRP Ledger.

## Documentation Structure

```
historical-data/
├── PLAN.md                      # Implementation plan and overview
├── index.md                     # Main documentation index
├── concepts/                    # Conceptual guides
│   ├── historical-queries.md   # Query patterns and best practices
│   ├── time-and-ledgers.md     # Time conversion and ledger indexing
│   └── pagination.md           # Pagination guide
└── reference/                   # API reference documentation
    ├── historical-reference.md # API reference overview
    ├── account_tx.md           # Account transaction history API
    ├── ledger.md               # Historical ledger queries
    └── ledger_data.md          # Historical ledger entries
```

## Quick Start

1. **Start with the Overview** - Read [index.md](index.md) for an introduction to historical data search
2. **Learn the Concepts** - Review the guides in the `concepts/` directory
3. **Reference the APIs** - Use the `reference/` directory for detailed API documentation

## Key Topics Covered

### Concepts
- **Historical Queries** - How to construct efficient queries for historical data
- **Time and Ledgers** - Converting between timestamps and ledger indices
- **Pagination** - Handling large result sets efficiently

### API Reference
- **account_tx** - Query account transaction history
- **ledger** - Retrieve historical ledger data
- **ledger_data** - Query ledger entries from historical ledgers

## Use Cases

- Transaction auditing and compliance
- Analytics and reporting
- Account reconciliation
- Debugging and investigation
- Historical state analysis

## Integration

This documentation is integrated into the main documentation site via `sidebars.yaml` and will appear in the navigation under "Prerelease Docs" > "Historical Data Search".

## Status

All documentation is complete and ready for use. The documentation follows the same patterns and style as other features in the opensource.ripple.com documentation site.
