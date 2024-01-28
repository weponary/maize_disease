const getOnlyFileExtension = (path: string) => {
  const fileExtension = path.split(".").pop();
  return fileExtension;
};

export { getOnlyFileExtension };
