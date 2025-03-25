//! # My Crate
//!
//! This crate demonstrates `rustdoc` warnings and errors.

/// This function has a broken link in its documentation.
/// 
/// See [`non_existent_function`] for more details.
pub fn example_function() {
    println!("Hello, world!");
}

/// This struct is missing documentation fields.
pub struct UndocumentedStruct {
    pub field: i32, // Missing field documentation
}

/// This function contains an incorrect doc-test.
/// 
/// ```
/// let x = 5;
/// assert_eq!(x, "five"); // This will cause a doc-test failure
/// ```
pub fn incorrect_doc_test() -> i32 {
    5
}

/// This function is private but still has documentation.
/// If `cargo doc --document-private-items` is not used, this will not be included in the docs.
fn private_function() {}

/// This function has a deprecated link syntax.
/// 
/// [DeprecatedLink](https://example.com) should be written with `<...>` instead.
pub fn deprecated_link_syntax() {}

/// This function is missing documentation (if `#![deny(missing_docs)]` is enabled).
pub fn undocumented_function() {}

