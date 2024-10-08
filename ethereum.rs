use web3::Web3;
use web3::transports::Http;
use crate::config::EthereumConfig;

pub struct EthereumClient {
    web3: Web3<Http>,
    wallet: web3::types::H160,
}

impl EthereumClient {
    pub fn new(config: &EthereumConfig) -> Result<Self, Box<dyn std::error::Error>> {
        let transport = Http::new(&config.rpc_url)?;
        let web3 = Web3::new(transport);
        let wallet = web3::types::H160::from_slice(&hex::decode(&config.private_key)?);
        Ok(Self { web3, wallet })
    }

    pub async fn execute_transaction(&self, recipient: &str, amount: web3::types::U256) -> Result<String, Box<dyn std::error::Error>> {
        println!("Simulating Ethereum transaction: Sending {} wei to {}", amount, recipient);
        Ok("Ethereum transaction simulated".to_string())
    }
}