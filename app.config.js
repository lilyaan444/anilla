export default {
  expo: {
    name: "anilla-cigar-explorer",
    slug: "anilla-cigar-explorer",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lilyaan444.anillacigarexplorer",
      buildNumber: "1.0.0",
      config: {
        usesNonExemptEncryption: false
      },
      // Add codegen config
      reactNativeCodegen: {
        enabled: true
      }
    },
    plugins: [
      "expo-router",
      [
        "react-native-reanimated",
        {
          "ios": {
            "codegenConfig": {
              "enabled": true
            }
          }
        }
      ]
    ],
    android: {
      package: "com.lilyaan444.anillacigarexplorer"
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/favicon.png"
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: "4c53966b-37ce-40ea-9fd2-6587ad317789"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    }
  }
};