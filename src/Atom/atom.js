import { atom } from "jotai";

// Define atoms for each piece of state
export const textAtom = atom(false);
export const logoAtom = atom(false);
export const drawAtom = atom(false);
export const browseAtom = atom(false);

export const CanvasNav = atom([textAtom, logoAtom, drawAtom, browseAtom]);
