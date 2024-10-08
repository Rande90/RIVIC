use serde::Deserialize;
use std::fs;

#[derive(Deserialize, Clone)]
pub struct Config {
    pub solana: SolanaConfig,
    pub ethereum: EthereumConfig,
    pub ton: TonConfig,
    pub polygon: PolygonConfig,
}

#[derive(Deserialize, Clone)]
pub struct SolanaConfig {
    pub rpc_url: String,
    pub wallet_path: String,
}

#[derive(Deserialize, Clone)]
pub struct EthereumConfig {
    pub rpc_url: String,
    pub private_key: String,
}

#[derive(Deserialize, Clone)]
pub struct TonConfig {
    pub endpoint: String,
    pub wallet_address: String,
}

#[derive(Deserialize, Clone)]
pub struct PolygonConfig {
    pub rpc_url: String,
    pub private_key: String,
}

impl Config {
    pub fn load(path: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let config_str = fs::read_to_string(path)?;
        let config: Config = toml::from_str(&config_str)?;
        Ok(config)
    }
}