use ammonia::Builder;

pub fn sanitize_html(unsafe_html: String) -> String {
    Builder::default()
        .add_tags(&["p", "span"])
        .clean(unsafe_html.clone().as_str())
        .to_string()
}
