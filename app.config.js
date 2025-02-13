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
      }
    },
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
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    },
    jsEngine: "jsc",
    developmentClient: {
      silentLaunch: true
    }
  }
};