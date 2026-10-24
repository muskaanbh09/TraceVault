import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreenPro } from './screens/HomeScreenPro';
import { AppDetailScreenPro } from './screens/AppDetailScreenPro';
import { DataBlackBoxScreenPro } from './screens/DataBlackBoxScreenPro';
import { PrivacyAnalyzerScreenPro } from './screens/PrivacyAnalyzerScreenPro';
import { AlertsScreenPro } from './screens/AlertsScreenPro';
import { SettingsScreen } from './screens/SettingsScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: SplashScreen,
  },
  {
    path: '/login',
    Component: LoginScreen,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { path: 'home', Component: HomeScreenPro },
      { path: 'app/:id', Component: AppDetailScreenPro },
      { path: 'data-box', Component: DataBlackBoxScreenPro },
      { path: 'analyzer', Component: PrivacyAnalyzerScreenPro },
      { path: 'alerts', Component: AlertsScreenPro },
      { path: 'settings', Component: SettingsScreen },
    ],
  },
]);