#[path = "sanitizer.rs"]
mod sanitizer;

use actix_web::{get, post, web, HttpResponse};
use log::debug;
use sanitizer::sanitize_html;
use serde::{Deserialize, Serialize};
// use serde_json::json;
use std::str;

#[derive(Debug, Serialize, Deserialize)]
pub struct StatusResult {
    pub status: i64,
    pub msg: String,
    pub code: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SanitizeResult {
    pub status: i64,
    pub result: String,
}

#[get("/")]
pub async fn status() -> HttpResponse {
    HttpResponse::Ok().json(StatusResult {
        status: 200,
        msg: "Online".to_string(),
        code: "ONLINE".to_string(),
    })
}

#[post("/")]
pub async fn sanitize_input(body: web::Bytes) -> HttpResponse {
    let unsafe_html = match str::from_utf8(body.as_ref()) {
        Ok(v) => v,
        Err(err) => {
            debug!("Error parsing text input {}", err);
            ""
        }
    };

    HttpResponse::Ok().json(SanitizeResult {
        status: 200,
        result: sanitize_html(unsafe_html.to_string()),
    })
}
