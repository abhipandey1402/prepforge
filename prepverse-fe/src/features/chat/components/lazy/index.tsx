import { lazy } from 'react';

export const LazyAddChatModal = lazy(() => import('../AddChatModal'));
export const LazyChatItem = lazy(() => import('../ChatItem'));
export const LazyMessageItem = lazy(() => import('../MessageItem'));