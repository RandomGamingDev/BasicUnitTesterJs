class UnitTester {
  constructor(name, description, test_func, subtesters = null) {
    this.name = name;
    this.description = description;
    this.test_func = test_func;
    this.subtesters = subtesters;

    this.succeeded = null;
    this.error = null;
    this.failed_sub_tests = [];
  }

  test(print = true, depth = 0) {
    this.succeeded = true;
    const indentation = UnitTester.generate_indentation(depth);

    if (print) {
      console.log(`${ indentation }Testing ${ this.name }...`)
      console.log(`${ indentation }${ this.name }'s description:  ${ this.description }`);
    }

    try {
      this.test_func();
    }
    catch (error) {
      this.succeeded = false;
      this.error = error;

      if (print) {
        console.log(this.error);
        console.log(`${ indentation }FAILURE: ${ this.name } failed!`);
      }

      return this;
    }

    if (print) {
      console.log(`${ indentation }SUCCESS: ${ this.name } succeeded`)
    }

    if (this.subtesters !== null)
      this.subtesters.forEach((subtester) => {
        const child_test = subtester.test(print, depth + 1);
	this.failed_sub_tests = this.failed_sub_tests.concat(child_test.failed_sub_tests);
	if (child_test.succeeded === false)
	  this.failed_sub_tests.push(child_test);
      });

    return this;
  }

  static assert(bool, error_msg = null) {
    if (!bool)
      throw new Error(error_msg === null ? undefined : error_msg);
  }

  static assert_strict_equal(item1, item2, error_msg = null) {
    return UnitTester.assert(item1 === item2, error_msg);
  }

  static assert_deep_equal(item1, item2, error_msg = null) {
    return UnitTester.assert(UnitTester.deep_equal(item1, item2), error_msg);
  }

  static deep_equal(item1, item2) {
     return JSON.stringify(item1) === JSON.stringify(item2);
  }

  static generate_indentation(level, indentation_char = "  ") {
    let indentation = "";
    for (let i = 0; i < level; i++)
      indentation += indentation_char;
    return indentation;
  }
}
