import { createAction } from "@reduxjs/toolkit";

export const setAuthenticate = createAction("AUTHENTICATED");
export const setUnAuthenticate = createAction("UNAUTHENTICATED");
export const setUser = createAction("SETUSER");
