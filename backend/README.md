## Implementations:

- Created two endpoints for API
- Added tests
- Added new PostgreSQL schema
- workflow for testing API
- Storing previous seen NFTs

### API Endpoints

#### `GET /:address/:page`

- This endpoint allows users to grab a batch of NFT tokens for a specific address. A batch contains 9 NFT with their data.

#### Responses

```
[
    {
        "status": "fulfilled",
        "value": {
            "tokenID": uint,
            "data": { ... }
         }
    },
    {
        "status": "rejected",
        "reason": "REASON"
    }
]
```

#### `GET /:address?tokenID={tokenID}`

- This endpoint allows users to grab a single NFT token with the corresponding tokenID and contract address.

#### Responses

```
{
    "status": "fulfilled",
    "value": {
        "tokenID": uint,
        "data": { ... }
    }
}
```

```
{
    "status": "rejected",
    "reason": "REASON"
}
```

##### ERC721 Metadata JSON Schema

- The schema for data value in responses

```
{
    "title": "Asset Metadata",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Identifies the asset to which this NFT represents"
        },
        "description": {
            "type": "string",
            "description": "Describes the asset to which this NFT represents"
        },
        "image": {
            "type": "string",
            "description": "A URI pointing to a resource with mime type image/* representing the asset to which this NFT represents. Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive."
        }
    }
}
```

#### PostgreSQL Schema

- Contracts table that stores the necessary information of an NFT: contract address, tokenID, and tokenURI. The tokenIndex is optional and is only used when trying to get a batch of NFTs. If previously stored NFT w/o tokenIndex the entry gets updated to include tokenIndex.

#### Storing previous seen NFTs

- A problem with reading from the Ethereum blockchain is how slow it is. To help solve this problem, we store previously seen NFTs in our database. This way we don't spend unnecessary time grabbing the same information over and over again, giving bad performance.
