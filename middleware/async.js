// It takes a function fn as an argument
const asyncHandler = (fn) => {
  // Return a function that takes the standard Express middleware parameters: req , res, next
  return (req, res, next) => {
    // Wrap the execution of the asynchronous route handler fn in a promise,
    // ensuring it always returns a promise
    return (
      Promise.resolve(fn(req, res, next))
        // Catch any errors that occur during the execution of fn
        // and forward them to the next middleware function
        .catch(next)
    );
  };
};

module.exports = asyncHandler;
