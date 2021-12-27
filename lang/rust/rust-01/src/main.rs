#[macro_use] extern crate log;
extern crate env_logger;
extern crate actix_web;

mod request_handlers;

use request_handlers::{status, sanitize_input};
use actix_web::{App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    std::env::set_var("RUST_LOG", "actix_server=info,actix_web=info");
    env_logger::init();

    info!("Rust Actix Server running... http://localhost:8080/");
    HttpServer::new(|| App::new()
        .service(status)
        .service(sanitize_input)
    )
    .bind("127.0.0.1:8111")?
    .run()
    .await
}