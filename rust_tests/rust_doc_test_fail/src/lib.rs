#![warn(
    missing_docs,
    rustdoc::all,
    unused,
    dead_code,
    unreachable_code,
    unsafe_code
)]

/// A crate with missing documentation (this should be properly documented)
///
/// # Example
///
/// ```
/// let _ = missing_crate_level_docs(); // This will be warned due to missing docs
/// ```
fn missing_crate_level_docs() {}

/// This struct lacks documentation for its fields.
struct UndocumentedStruct {
    field: i32, // Missing doc comment warning
    another_field: i32,
}

/// Enum missing documentation for its variants.
enum UndocumentedEnum {
    VariantOne,
    VariantTwo,
}

/// Trait without documentation.
trait UnusedTrait {
    fn do_something();
}

/// Struct that implements an unused trait.
struct UnusedStruct;

impl UnusedTrait for UnusedStruct {
    fn do_something() {
        let _meaningless_computation = 2 + 2; // Unused computation
    }
}

/// A function that does multiple problematic things.
fn problematic_function() -> i32 {
    let unused_variable = 42; // Unused variable warning

    if false {
        return 10; // Unreachable code warning
    }

    unsafe {
        let _danger = std::ptr::null::<i32>().read(); // Unsafe block warning
    }

    0
}

/// Function with incorrect documentation format
///
/// ```
/// let x = bad_doc_example();  // This is an incorrect example
/// ```
///
/// It should return a `String`.
fn bad_doc_example() -> String {
    let _unused_string = String::from("Hello"); // Unused variable warning

    let mut never_mutated = 5;
    never_mutated = 10; // Warning: Value assigned but never used

    "bad docs".to_string()
}

/// Unused constant.
const UNUSED_CONST: i32 = 123;

/// Unused module.
mod unused_module {
    pub fn some_function() {}
}

/// Function containing unnecessary return.
fn redundant_return() -> i32 {
    return 5; // Warning: Unnecessary return statement
}

/// Function with a needless borrow.
fn needless_borrow() {
    let s = String::from("Hello");
    let _borrowed = &s; // Borrowing when not necessary warning
}

/// Function shadowing a variable.
fn shadowing() {
    let value = 10;
    let value = "shadowed"; // Shadowing warning
}

/// Function with an unnecessary `mut`.
fn unnecessary_mut() {
    let mut x = 5; // `mut` is unnecessary
    println!("{}", x);
}

/// Function with a doc test that will fail.
fn failing_doctest() -> i32 {
    5
}

/// ```
/// assert_eq!(failing_doctest(), 10); // This will cause a test failure in rustdoc
/// ```
fn incorrect_doc_test() {}

/// Function with a missing return type in documentation.
///
/// ```
/// let result = missing_return_type(); // Doc test warning
/// ```
fn missing_return_type() -> i32 {
    42
}

/// Function with an infinite recursion, which rustdoc warns about.
fn infinite_recursion() {
    infinite_recursion(); // Stack overflow warning
}

/// Unreachable code due to return.
fn unreachable_code_demo() -> i32 {
    return 5;
    println!("This will never run!"); // Unreachable warning
}

//ghost
