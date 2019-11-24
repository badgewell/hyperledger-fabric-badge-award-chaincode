# Badgable (Badgewell team in Ethberlin Hackthon)

> This was made in Ethberlin hackathon. This repo includes 3box logic only and is no longer maintained.
 
> Our objective to do a bear minimum implementation that allows the certificates and its awards to be updated and versioned.

## Highlights
-   Cheap
-   Decentralized with IPFS <3
-   Regular User isnt required to have a wallet
-   Fully Transparent



## Technology
- Metamask
- 3Box

## Actions
-	Define badge
-	Edit badge
-   Add award
-   Edit award


## Data Models
>   TS interfaces are in the code for more details
-  Badge 
-  Award
### Badge Structure
- An array of the available badges pointer(string ids) from this organization is attached to the profile for easy fetching
- Every Badge includes array of Awards and array of updates that includes all the badge versions
### Award Structure
- Award is the single credentials for a single user
- An Array of updates is added that lists all the changes in award like recipient name
