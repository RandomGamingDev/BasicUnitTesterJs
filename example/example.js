const test = new UnitTester("Root Test", "The test that starts it all! (it also stores all the results and can be parsed into a JSON for storage of said results)",
  () => {
  },
  [
    new UnitTester("This subtest is mean to fail!", "Something nice about this unit tester is that it keeps on testing even after something fails, whcih means that you'll be able to check everything else in case you're having trouble with a specific problem which especially helps if you can find other issues happening at the same time since the issues could be causing one another or correlated! (Note: Although tests following will still run, tests that are children of this test won't)",
      () => {
        UnitTester.assert(false);
      }
    ),
    new UnitTester("UnitTester.assert(test: bool, error_msg: String)", "This test asserts whether or not its input is true",
      () => {
	UnitTester.assert(true);
      },
    ),
    new UnitTester("UnitTester.assert_strict_equal(item1: any, item2: any, error_msg: String)", "This test strictly (===) asserts whether or not its inputs are equal",
      () => {
        UnitTester.assert_strict_equal(123, 123);
      }
    ),
    new UnitTester("UnitTester.assert_deep_equal(item1: any, item2: any, error_msg: String)", "This test does a deep check on whether or not its inputs are equal",
      () => {
        UnitTester.assert_deep_equal([1, 2, 3], [1, 2, 3]);
      }
    ),
  ]
).test(); // And we call test at the end in order to execute the test!

// Here are the results output after the testing has finished!
console.log("RESULTS: ");

// This logs any failed tests belonging to the root test (if the root test fails you'll want to check the root test's state)
console.log("Failed Tests (if the line below this is empty there are no failures): ");
console.log(test.failed_sub_tests);

// This logs everything in the test, not just errors!
console.log("All Test Results: ");
// The test results are all stored in the root test (the UnitTester containing every other UnitTester) which means that you can easily print them out
console.log(test);
// And also store them as a JSON!
console.log(JSON.stringify(test));
