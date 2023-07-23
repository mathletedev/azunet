use actix_web::{HttpServer, App};

#[tokio::main]
async fn main() -> std::io::Result<()> {
	println!("🚀 server started!");

	HttpServer::new(move || {
		App::new()
	}).bind(("127.0.0.1", 8080))?.run().await
}
