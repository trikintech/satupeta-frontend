type ThemeInput = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: Record<string, any>;
  borderRadius: Record<string, string>;
  fontSizes: Record<string, string>;
};

export function createTheme(theme: ThemeInput) {
  return {
    ...theme,
    getColor: (key: string) => {
      // Example utility function
      const keys = key.split(".");
      let color = theme.colors;
      for (const k of keys) {
        if (color[k]) {
          color = color[k];
        } else {
          return undefined;
        }
      }
      return color;
    },
  };
}
