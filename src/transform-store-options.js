export default (sourceOptions) => {
  const options = sourceOptions;
  options.state.count = 1;
  options.mutations.increment = (state) => {
    state.count += 1;
  };
  return options;
};
