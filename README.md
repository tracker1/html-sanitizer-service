# html-sanitizer-service

Micro service implementation(s) for HTML Sanitization

This is an experiment, I just wanted to create a minimal micro-service to do one job to kind of compare and contrast.

## Languages

### Deno-01 (TypeScript, oak)

The Deno solution is probably the most complete, with probably more validation than necessary. Note, it uses a WASM build of the same sanatizer engine that the Rust version uses.

### Node-01 (JavaScript, express)

JavaScript solution using Node.js with Express.

### CSharp-01

### Rust-01

## TODO

Performance tests for response timing and memory overhead.
