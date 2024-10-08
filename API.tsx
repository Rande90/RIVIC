// In your Cargo.toml, add these dependencies:
// actix-web = "4.0"
// actix-cors = "0.6"
// serde = { version = "1.0", features = ["derive"] }

use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct TransactionRequest {
    solana: ChainTransaction,
    ethereum: ChainTransaction,
    ton: ChainTransaction,
    polygon: ChainTransaction,
}

#[derive(Deserialize)]
struct ChainTransaction {
    recipient: String,
    amount: String,
}

#[derive(Serialize)]
struct TransactionResponse {
    success: bool,
    message: String,
}

async fn execute_transactions(req: web::Json<TransactionRequest>) -> impl Responder {
    // Here you would call your Rivic executor logic
    // For now, we'll just simulate a successful transaction
    
    println!("Received transaction request: {:?}", req);
    
    // Simulate some processing time
    tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;
    
    HttpResponse::Ok().json(TransactionResponse {
        success: true,
        message: "Transactions executed successfully".to_string(),
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .route("/api/execute", web::post().to(execute_transactions))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}