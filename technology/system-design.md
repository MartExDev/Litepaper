# System Design

To sum up, ShopFi innovatively presents a new consensus mechanism, which we named Proof of Procedures (PoP). This mechanism is specially made for traditional off-chain transactions, incredibly both time-consuming and complicated processes. Let's analyze it step by step:

1. Firstly, the system needs to define possible states and circulation between them in an initial transaction through defining structs/enums.&#x20;
2. Each subsequent order needs to indicate which flow it references.&#x20;
3. The system divides order processing into three types:&#x20;
   1. The primary order transaction, this type of order is only responsible for displaying the summary information, and all they are chained one by one.&#x20;
   2. For sub-order transactions, it is responsible for recording and saving the status changes of each step, and the sub-order will record its previous state by reference. In this way, in a single order, the transitions between the states can form a chain structure so that a complete state-changing record can be obtained.&#x20;
   3. Storage transactions. Because of the nature of the blockchain, storing a large amount of data on the chain can be very expensive, so some public data of the order will be stored as files in the decentralized storage (such as IPFS or Arweave). e.g., product name, model, quantity, unit price, corresponding mall URL, product snapshot, etc.&#x20;
4. The primary order tx and the first sub-order tx will be created at the same time when an order is placed. The subsequent sub-state changes will be synchronized to update the summary order according to the corresponding process when it reaches the last step.&#x20;
5. By using the hashes of the primary order (first sub-order, last sub-order, and storage), all the information required can be aggregated in one place to reform a complete charge.&#x20;
6. The ShopFi node is designed to be responsible for data extraction, packaging, and submission of transactions to obtain corresponding rewards.&#x20;
7. The ShopFi node is also responsible for pushing messages corresponding to status changes.

Through the design above, ShopFi uses innovative contract technology to preserve records on the chain for each state change. When the order is created or finalized, the data is extracted and pushed to the chain by the ShopFi node.&#x20;

Through this process, we can freely define the process flow of each order and allow them to have their different transaction procedures, such as successful completion or return and exchange. Due to the existence of PoP consensus, we can find all required information through any step, so we can ensure the data is sufficiently secure while ensuring efficiency, as well as all orders and all state changes can be easily verified if it’s necessary. As shown below:

![](https://lh6.googleusercontent.com/SItBCRevdQqwqlDBM1Yd-WnD6\_Y1IhmK3IlOZO0YeymQ-QSKb8k7Ms96ES\_aUGLo-XI07lduKRPyAzm2303CtITvMe53aQLcP3gF5yfIn757HD\_JlC6ssXWggdrqdXBvNUf9qvvE)
