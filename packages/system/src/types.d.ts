interface ErrorConstructor {
  /**
   * Non-standard static method of the error constructor on v8 engines
   * See https://v8.dev/docs/stack-trace-api#stack-trace-collection-for-custom-exceptions.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types -- actual argument for the function
  captureStackTrace?: (error: Object, constructor?: Function) => void;
}
