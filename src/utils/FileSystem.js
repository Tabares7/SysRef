import * as FileSystem from "expo-file-system";

const clearCache = async () => {
  try {
    const cacheDirectory = FileSystem.cacheDirectory;
    const files = await FileSystem.readDirectoryAsync(cacheDirectory);
    await Promise.all(
      files.map((file) => FileSystem.deleteAsync(`${cacheDirectory}${file}`))
    );
    console.log("Cache cleared successfully");
  } catch (error) {
    console.error("Error clearing cache", error);
  }
};
