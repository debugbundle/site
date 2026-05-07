"use client";

import { useEffect } from "react";

import { initializeSiteDogfooding } from "@/lib/dogfooding";

export function DogfoodingBootstrap(): null {
  useEffect(() => {
    initializeSiteDogfooding({
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_API_URL"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_API_URL: process.env["NEXT_PUBLIC_DEBUGBUNDLE_API_URL"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENABLED"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENABLED: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENABLED"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_PROJECT_TOKEN"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENDPOINT"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENDPOINT: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENDPOINT"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_SERVICE"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_SERVICE: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_SERVICE"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENVIRONMENT"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENVIRONMENT: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_ENVIRONMENT"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_EXPOSE_TRIGGERS"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_EXPOSE_TRIGGERS: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_EXPOSE_TRIGGERS"] }),
      ...(process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_CAPTURE_CONSOLE"] === undefined
        ? {}
        : { NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_CAPTURE_CONSOLE: process.env["NEXT_PUBLIC_DEBUGBUNDLE_DOGFOOD_CAPTURE_CONSOLE"] })
    });
  }, []);

  return null;
}