"use client";

import { type EdgeStoreRouter } from "@/app/api/edgestore/[...edgstore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

export const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>({});