export const DUMMY_AGENT_MESSAGE = `
Great idea! Let me break down my thoughts on this:

## Initial Assessment

This concept has **strong potential** in the current market. Here's why:

- The restaurant industry loses **$100B annually** to mismanagement
- DAOs have proven successful in collective ownership models
- Community-driven decisions outperform individual ones by 34%

## Proposed Structure

| Role | Responsibility | Token Weight |
|------|---------------|--------------|
| Core Team | Operations | 40% |
| Investors | Funding | 35% |
| Community | Voting | 25% |

## Tech Considerations

The smart contract layer would look something like this:

\`\`\`solidity
contract RestaurantDAO {
  mapping(address => uint256) public shares;
  
  function vote(uint256 proposalId) external {
    require(shares[msg.sender] > 0, "No voting power");
  }
}
\`\`\`

## My Verdict

> This is one of the more grounded DAO applications I've seen. 
> Real assets, real cash flow, real community value.

The path forward is **clear** but not *easy*. We need to solve governance before we touch a single restaurant.
`;
