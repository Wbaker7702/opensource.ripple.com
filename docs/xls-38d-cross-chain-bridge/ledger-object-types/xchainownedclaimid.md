---
html: xchainownedclaimid.html
parent: ledger-object-types.html
blurb: An `XChainOwnedClaimID` object represents *one* cross-chain transfer of value. 
labels:
  - Interoperability
status: not_enabled
---
# XChainClaimID
[[Source]](https://github.com/seelabs/rippled/blob/xchain/src/ripple/protocol/impl/LedgerFormats.cpp#L282-L295 "Source")

An `XChainOwnedClaimID` object represents *one* cross-chain transfer of value and includes information of the account on the source chain that locks or burns the funds on the source chain.

The `XChainOwnedClaimID` object must be acquired on the destination chain before submitting a `XChainCommit` on the source chain. Its purpose is to prevent transaction replay attacks and is also used as a place to collect attestations from witness servers.

An `XChainCreateClaimID` transaction is used to create a new `XChainOwnedClaimID`. The ledger object is destroyed when the funds are successfully claimed on the destination chain.


## Example XChainClaimID JSON

```json
{
  "Account": "rHiNUTpDAiQLxMeg2Y9qbQYery1nK1MEmr",
  "Flags": 0,
  "LedgerEntryType": "XChainOwnedClaimID",
  "OtherChainSource": "raromgoXexgo2RnGBRchgL11bZdXdGagaC",
  "OwnerNode": "0",
  "PreviousTxnID": "E134CEC9B8799D6AE27011457C69D611ACC4FDD0772AAFFF3B85095EF0195572",
  "PreviousTxnLgrSeq": 161,
  "SignatureReward": "304",
  "XChainBridge": {
    "IssuingChainDoor": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
    "IssuingChainIssue": {
      "currency": "XRP"
    },
    "LockingChainDoor": "r3nCVTbZGGYoWvZ58BcxDmiMUU7ChMa1eC",
    "LockingChainIssue": {
      "currency": "XRP"
    }
  },
  "XChainClaimAttestations": [],
  "XChainClaimID": "2",
  "index": "4D354A9DDCC2A5D7AEC166E633AF45360B3C31ECCCBD7ED4DA230DC1066E969E"
}
```


## XChainClaimID Fields

| Field                     | JSON Type         | [Internal Type][] | Required? | Description     |
|:--------------------------|:------------------|:------------------|:----------|:----------------|
| `LedgerIndex`             | `string`          | `HASH256`         | Yes       | The ledger index is a hash of a unique prefix for `XChainOwnedClaimID`s, the actual `XChainClaimID` value, and the fields in `XChainBridge`. |
| `OtherChainSource`        | `string`          | `ACCOUNT`         | Yes       | The account that must send the corresponding `XChainCommit` on the source chain. The destination may be specified in the `XChainCommit` transaction, which means that if the `OtherChainSource` isn't specified, another account can try to specify a different destination and steal the funds. This also allows tracking only a single set of signatures, since we know which account will send the `XChainCommit` transaction. |
| `SignatureReward`         | `Currency Amount` | `AMOUNT`          | Yes       | The total amount to pay the witness servers for their signatures. It must be at least the value of `SignatureReward` in the `Bridge` ledger object. |
| `XChainBridge`            | `XChainBridge`    | `XCHAIN_BRIDGE`   | Yes       | The door accounts and assets of the bridge this object correlates to. |
| `XChainClaimAttestations` | `array`           | `ARRAY`           | Yes       | Attestations collected from the witness servers. This includes the parameters needed to recreate the message that was signed, including the amount, which chain (locking or issuing), optional destination, and reward account for that signature. |
| `XChainClaimID`           | `string`          | `UINT64`          | Yes       | The unique sequence number for a cross-chain transfer. |


### XChainBridge Fields

| Field               | JSON Type | [Internal Type][] | Required? | Description     |
|:--------------------|:----------|:------------------|:----------|:----------------|
| `IssuingChainDoor`  | `string`  | `ACCOUNT`         | Yes       | The door account on the issuing chain. For an XRP-XRP bridge, this must be the genesis account (the account that is created when the network is first started, which contains all of the XRP). |
| `IssuingChainIssue` | `Issue`   | `ISSUE`           | Yes       | The asset that is minted and burned on the issuing chain. For an IOU-IOU bridge, the issuer of the asset must be the door account on the issuing chain, to avoid supply issues. |
| `LockingChainDoor`  | `string`  | `ACCOUNT`         | Yes       | The door account on the locking chain. |
| `LockingChainIssue` | `Issue`   | `ISSUE`           | Yes       | The asset that is locked and unlocked on the locking chain. |