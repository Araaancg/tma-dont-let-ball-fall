"use client";
import React, { ReactNode } from "react";
import {
  SDKProvider,
  retrieveLaunchParams,
  useBackButton,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  isSSR,
} from "@tma.js/sdk-react";
import type { AppProps } from "next/app";
import { type FC, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

const BackButtonManipulator: FC = () => {
  const router = useRouter();
  const bb = useBackButton(true);
  const pathname = usePathname();

  useEffect(() => {
    if (!bb) {
      return;
    }
    if (pathname === "/") {
      bb.hide();
    } else {
      bb.show();
    }
  }, [router, bb]);

  useEffect(() => {
    return bb && bb.on("click", router.back);
  }, [bb, router.back]);

  return null;
};

interface IAppPropsType {
  children: ReactNode;
}

const App: FC<IAppPropsType> = ({ children }) => {
  console.log("App!!");
  const miniApp = useMiniApp(true);
  const themeParams = useThemeParams(true);
  const viewport = useViewport(true);

  useEffect(() => {
    return miniApp && themeParams && bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return themeParams && bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <SDKProvider acceptCustomStyles debug={true}>
      <BackButtonManipulator />
      {children}
    </SDKProvider>
  );
};

export default App;
