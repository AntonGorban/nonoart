import { useStoreSelector } from './appHeader.store';

export const useState = () => useStoreSelector((s) => s);

export const useTitle = () => useStoreSelector((s) => s.title);
export const useIcon = () => useStoreSelector((s) => s.icon);
export const useActionList = () => useStoreSelector((s) => s.actionList);
