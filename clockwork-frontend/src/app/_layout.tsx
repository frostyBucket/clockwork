import { Stack, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e293b',
        },
        headerTintColor: '#fff',

        headerTitle: () => null,

         headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: 'center',

        headerLeft: () => (
          <Link href="/profile" asChild>
            <Ionicons
              name="menu"
              size={26}
              color="white"
              style={{ marginLeft: 12 }}
            />
          </Link>
        ),

        headerRight: () => (
          <Link href="/settings" asChild>
            <Ionicons
              name="person-circle"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          </Link>
        ),
      }}
    />
  );
}
