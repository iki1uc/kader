export const VISITOR = () => {
  return {
    id: crypto.randomUUID(),
    time: Date.now(),
    action: "view",
    url: location.href
  };
};
