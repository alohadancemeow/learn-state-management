'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme as antTheme, App } from 'antd';
import { store, persistor } from '@/store';
import { useAppSelector } from '@/store/hooks';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </PersistGate>
      </Provider>
    </AntdRegistry>
  );
}
