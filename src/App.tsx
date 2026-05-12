/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [folderPaneWidth, setFolderPaneWidth] = useState(260);
  const [messageListWidth, setMessageListWidth] = useState(350);

  const isResizingFolder = useRef(false);
  const isResizingList = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingFolder.current) {
        // e.clientX is distance from left edge of screen
        // Left rail is 48px
        let w = e.clientX - 48;
        if (w < 150) w = 150; // min width
        if (w > 400) w = 400; // max width
        setFolderPaneWidth(w);
      } else if (isResizingList.current) {
        // e.clientX distance from left edge
        let w = e.clientX - 48 - folderPaneWidth;
        if (w < 350) w = 350; // min width for message list

        // Max up to half of remaining width
        const available = window.innerWidth - 48 - folderPaneWidth;
        const maxListWidth = available / 2;
        if (w > maxListWidth) w = maxListWidth;
        
        setMessageListWidth(w);
      }
    };

    const handleMouseUp = () => {
      isResizingFolder.current = false;
      isResizingList.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [folderPaneWidth]);

  const startResizeFolder = () => {
    isResizingFolder.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const startResizeList = () => {
    isResizingList.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className="bg-[#faf9f8] h-screen flex flex-col text-sm text-[#323130]">
      {/* BEGIN: MainHeader */}
      <header className="app-header h-12 flex items-center justify-between px-4 text-white shrink-0">
        {/* Left: App Launcher & Branding */}
        <div className="flex items-center space-x-4 w-64">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="App Launcher"
          >
            <i className="fa-solid fa-braille text-xl"></i>
          </button>
          <span className="font-semibold text-base tracking-wide">Outlook</span>
        </div>
        {/* Center: Search */}
        <div className="flex-1 max-w-2xl mx-auto flex justify-center">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-1.5 border-transparent rounded bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm h-8"
              placeholder="搜索"
              type="text"
            />
          </div>
        </div>
        {/* Right: Utility Icons */}
        <div className="flex items-center space-x-2 w-64 justify-end">
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="Meet Now"
          >
            <i className="fa-solid fa-video"></i>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="Chat"
          >
            <i className="fa-regular fa-comment-dots"></i>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="My Day"
          >
            <i className="fa-regular fa-calendar-check"></i>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="Notifications"
          >
            <i className="fa-regular fa-bell"></i>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="Settings"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded"
            title="Help"
          >
            <i className="fa-regular fa-circle-question"></i>
          </button>
          <div className="ml-2 w-8 h-8 rounded-full bg-white text-[#0078d4] flex items-center justify-center font-bold text-xs cursor-pointer border-2 border-transparent hover:border-white/50">
            TM
          </div>
        </div>
      </header>
      {/* END: MainHeader */}
      {/* BEGIN: SecondaryToolbar */}
      <div className="bg-white border-b border-[#edebe9] h-12 flex items-center px-4 shrink-0 shadow-sm z-10 relative">
        <div className="flex items-center space-x-1 text-[#605e5c]">
          <button className="px-3 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center text-[#0f6cbd] font-semibold">
            <i className="fa-solid fa-bars mr-2"></i> 主页
          </button>
          <button className="px-3 py-1.5 hover:bg-[#f3f2f1] rounded">查看</button>
          <button className="px-3 py-1.5 hover:bg-[#f3f2f1] rounded">帮助</button>
        </div>
        <div className="h-6 w-px bg-[#edebe9] mx-2"></div>
        <div className="flex items-center space-x-1 text-[#605e5c]">
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-envelope-open-text mr-1.5 text-lg"></i> 视图设置
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-regular fa-message mr-1.5 text-lg"></i> 消息{' '}
            <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-list-ul mr-1.5 text-lg"></i> 折叠对话
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-magnifying-glass-plus mr-1.5 text-lg"></i> 缩放
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-rotate-right mr-1.5 text-lg"></i> 同步
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-table-columns mr-1.5 text-lg"></i> 布局{' '}
            <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-regular fa-folder-open mr-1.5 text-lg"></i> 文件夹窗格{' '}
            <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-bars-staggered mr-1.5 text-lg"></i> 密度{' '}
            <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded flex items-center">
            <i className="fa-solid fa-book-open-reader mr-1.5 text-lg text-[#0f6cbd]"></i> 沉浸式阅读器
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f3f2f1] rounded">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
      {/* END: SecondaryToolbar */}
      {/* BEGIN: MainContentArea */}
      <div className="flex flex-1 overflow-hidden">
        {/* BEGIN: Left Rail (Icons) */}
        <div className="w-12 bg-[#f3f2f1] flex flex-col items-center py-2 space-y-2 shrink-0 border-r border-[#edebe9] z-20">
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon active"
            title="Mail"
          >
            <i className="fa-solid fa-envelope text-xl"></i>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="Calendar"
          >
            <i className="fa-regular fa-calendar text-xl relative">
              <span className="absolute top-[2px] right-[-2px] w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
            </i>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="People"
          >
            <i className="fa-solid fa-user-group text-xl"></i>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="To Do"
          >
            <i className="fa-solid fa-check-double text-xl"></i>
          </button>
          <div className="my-2 w-6 border-b border-[#c8c6c4]"></div>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="Word"
          >
            <i className="fa-regular fa-file-word text-xl text-blue-600"></i>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="Excel"
          >
            <i className="fa-regular fa-file-excel text-xl text-green-600"></i>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="PowerPoint"
          >
            <i className="fa-regular fa-file-powerpoint text-xl text-orange-600"></i>
          </button>
          <div className="flex-1"></div>
          <button
            className="w-10 h-10 flex items-center justify-center nav-icon hover:bg-[#edebe9] rounded"
            title="More Apps"
          >
            <i className="fa-solid fa-grid-2 text-xl"></i>
          </button>
        </div>
        {/* END: Left Rail */}
        {/* BEGIN: Folder Pane */}
        <div style={{ width: folderPaneWidth }} className="bg-white flex flex-col shrink-0 pane-border overflow-y-auto">
          {/* Favorites Section */}
          <div className="mt-2">
            <div className="px-4 py-2 flex items-center justify-between text-[#605e5c] hover:bg-[#f3f2f1] cursor-pointer group">
              <div className="flex items-center font-semibold">
                <i className="fa-solid fa-chevron-down text-xs w-5"></i>
                <span className="">收藏夹</span>
              </div>
            </div>
            <ul>
              <li className="folder-active px-4 py-2 pl-9 flex items-center justify-between cursor-pointer text-[#0f6cbd]">
                <div className="flex items-center">
                  <i className="fa-regular fa-envelope mr-3 text-lg"></i>
                  <span className="">收件箱</span>
                </div>
                <span className="font-semibold">19</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-regular fa-paper-plane mr-3 text-lg"></i>
                <span className="">已发送邮件</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-solid fa-pencil mr-3 text-lg"></i>
                <span className="">草稿</span>
              </li>
            </ul>
          </div>
          {/* Account Section */}
          <div className="mt-4">
            <div className="px-4 py-2 flex items-center justify-between text-[#605e5c] hover:bg-[#f3f2f1] cursor-pointer group">
              <div className="flex items-center font-semibold">
                <i className="fa-solid fa-chevron-down text-xs w-5"></i>
                <span
                  className="truncate w-40"
                  title="TommyMartin4384@outlook.com"
                >
                  TommyMartin43...
                </span>
              </div>
            </div>
            <ul>
              <li className="folder-active px-4 py-2 pl-9 flex items-center justify-between cursor-pointer text-[#0f6cbd]">
                <div className="flex items-center">
                  <i className="fa-regular fa-envelope mr-3 text-lg"></i>
                  <span className="">收件箱</span>
                </div>
                <span className="font-semibold">19</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center justify-between cursor-pointer hover:bg-[#f3f2f1]">
                <div className="flex items-center">
                  <i className="fa-regular fa-trash-can mr-3 text-lg"></i>
                  <span className="">垃圾邮件</span>
                </div>
                <span className="font-semibold text-[#0f6cbd]">3</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-solid fa-pencil mr-3 text-lg"></i>
                <span className="">草稿</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-regular fa-paper-plane mr-3 text-lg"></i>
                <span className="">已发送邮件</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-regular fa-folder mr-3 text-lg"></i>
                <span className="">已删除邮件</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-regular fa-box-archive mr-3 text-lg"></i>
                <span className="">存档</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-regular fa-clock mr-3 text-lg"></i>
                <span className="">对话历史记录</span>
              </li>
              <li className="px-4 py-2 pl-9 flex items-center cursor-pointer hover:bg-[#f3f2f1]">
                <i className="fa-regular fa-note-sticky mr-3 text-lg"></i>
                <span className="">注释</span>
              </li>
            </ul>
          </div>
        </div>
        {/* END: Folder Pane */}
        {/* Resizer for Folder Pane */}
        <div 
          onMouseDown={startResizeFolder}
          className="w-1 cursor-col-resize hover:bg-[#0f6cbd] transition-colors shrink-0 z-10 -ml-[1px]" 
        />
        {/* BEGIN: Message List Pane */}
        <div style={{ width: messageListWidth }} className="bg-white flex flex-col shrink-0 pane-border relative">
          {/* List Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#edebe9] shrink-0">
            <div className="flex space-x-4">
              <button className="font-semibold text-[#0f6cbd] border-b-2 border-[#0f6cbd] pb-1">
                重点
              </button>
              <button className="text-[#605e5c] hover:text-black pb-1">其他</button>
            </div>
            <div className="flex space-x-2 text-[#605e5c]">
              <button className="hover:bg-[#f3f2f1] p-1 rounded">
                <i className="fa-solid fa-filter"></i>
              </button>
              <button className="hover:bg-[#f3f2f1] p-1 rounded">
                <i className="fa-solid fa-arrow-down-short-wide"></i>
              </button>
              <button className="hover:bg-[#f3f2f1] p-1 rounded">
                <i className="fa-solid fa-list-check"></i>
              </button>
            </div>
          </div>
          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {/* Group Header */}
            <div className="px-4 py-2 bg-[#faf9f8] border-b border-[#edebe9] flex items-center justify-between text-xs text-[#605e5c]">
              <span className="">其他电子邮件(8)</span>
              <span className="truncate w-32 text-right">Cursor Team; Cursor; Microsoft Account</span>
            </div>
            {/* Ad Item */}
            <div className="flex px-4 py-3 border-b border-[#edebe9] hover:bg-[#f3f2f1] cursor-pointer group">
              <div className="w-10 shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  <i className="fa-brands fa-windows"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-[15px] truncate text-[#201f1e]">
                    Microsoft Outlook
                  </span>
                  <div className="flex items-center text-xs text-[#605e5c]">
                    <span className="border border-gray-300 rounded px-1 text-[10px] mr-1">广告</span>
                    <i className="fa-solid fa-ellipsis hidden group-hover:block ml-1"></i>
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-[#0f6cbd] truncate text-sm">升级帐户</span>
                  <span className="text-[#0f6cbd] text-xs font-semibold">21:42</span>
                </div>
                <div className="text-[#605e5c] truncate text-sm">获取 Outlook 最新高级功能</div>
              </div>
            </div>
            {/* Normal Item */}
            <div className="flex px-4 py-3 border-b border-[#edebe9] hover:bg-[#f3f2f1] cursor-pointer group">
              <div className="w-10 shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                  MC
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-[15px] truncate text-[#201f1e]">
                    Microsoft Cashback
                  </span>
                  <span className="text-[#605e5c] text-xs">周六 12:08</span>
                </div>
                <div className="font-semibold text-[#0f6cbd] truncate text-sm mb-0.5">
                  Uw Cashback-update
                </div>
                <div className="text-[#605e5c] truncate text-sm">
                  Uw Cashback-update - Welkom jin! U...
                </div>
              </div>
            </div>
            {/* Active Item */}
            <div className="flex px-4 py-3 border-b border-[#edebe9] list-item-active cursor-pointer group">
              <div className="w-10 shrink-0 mr-3 flex items-center">
                <input
                  className="w-4 h-4 text-[#0f6cbd] border-gray-300 rounded focus:ring-[#0f6cbd] ml-2"
                  type="checkbox"
                  defaultChecked={false}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-[15px] truncate text-[#201f1e]">Cursor</span>
                  <span className="text-[#605e5c] text-xs">周六 10:35</span>
                </div>
                <div className="text-[#201f1e] truncate text-sm mb-0.5">完成验证码挑战</div>
                <div className="text-[#605e5c] truncate text-sm">您的一次性验证码是 795649。此验证码...</div>
              </div>
            </div>
            {/* Group Header */}
            <div className="px-4 py-2 flex items-center text-sm font-semibold text-[#201f1e] hover:bg-[#f3f2f1] cursor-pointer">
              <i className="fa-solid fa-chevron-down text-xs w-5 mr-1"></i> 更早
            </div>
            {/* Earlier Items */}
            <div className="flex px-4 py-3 border-b border-[#edebe9] hover:bg-[#f3f2f1] cursor-pointer group">
              <div className="w-10 shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  C
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-[15px] truncate text-[#201f1e]">Cursor</span>
                  <span className="text-[#0f6cbd] text-xs font-semibold">2026/1/28</span>
                </div>
                <div className="font-semibold text-[#0f6cbd] truncate text-sm mb-0.5">
                  $60.00 payment to Curs...
                </div>
                <div className="text-[#605e5c] truncate text-sm">
                  We weren't able to charge the credit c...
                </div>
              </div>
            </div>
            <div className="flex px-4 py-3 border-b border-[#edebe9] hover:bg-[#f3f2f1] cursor-pointer group">
              <div className="w-10 shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  C
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-[15px] truncate text-[#201f1e]">Cursor</span>
                  <span className="text-[#0f6cbd] text-xs font-semibold">2026/1/26</span>
                </div>
                <div className="font-semibold text-[#0f6cbd] truncate text-sm mb-0.5">
                  $60.00 payment to Curs...
                </div>
                <div className="text-[#605e5c] truncate text-sm">
                  We weren't able to charge the credit c...
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END: Message List Pane */}
        {/* Resizer for Message List */}
        <div 
          onMouseDown={startResizeList}
          className="w-1 cursor-col-resize hover:bg-[#0f6cbd] transition-colors shrink-0 z-10 -ml-[1px]" 
        />
        {/* BEGIN: Reading Pane */}
        <div className="flex-1 bg-white flex flex-col min-w-[300px] relative">
          {/* Email Header */}
          <div className="px-6 py-4 flex flex-col shrink-0 border-b border-[#edebe9]">
            <h1 className="text-xl font-semibold text-[#201f1e] mb-4">完成验证码挑战</h1>
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg mr-4 mt-1">
                  C
                </div>
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold text-base text-[#201f1e]">Cursor</span>
                    <span className="text-sm text-[#605e5c]">&lt;no-reply@cursor.sh&gt;</span>
                  </div>
                  <div className="text-sm text-[#605e5c] mt-0.5">收件人: tommymartin4384@outlook.com</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-3 text-[#605e5c] mb-2">
                  <button className="hover:bg-[#f3f2f1] p-1.5 rounded text-[#0f6cbd]" title="回复">
                    <i className="fa-solid fa-reply"></i>
                  </button>
                  <button
                    className="hover:bg-[#f3f2f1] p-1.5 rounded text-[#0f6cbd]"
                    title="全部回复"
                  >
                    <i className="fa-solid fa-reply-all"></i>
                  </button>
                  <button className="hover:bg-[#f3f2f1] p-1.5 rounded text-[#0f6cbd]" title="转发">
                    <i className="fa-solid fa-share"></i>
                  </button>
                  <button
                    className="hover:bg-[#f3f2f1] p-1.5 rounded border border-[#edebe9]"
                    title="其他操作"
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </div>
                <div className="text-sm text-[#605e5c]">周六 2026/5/9 10:35</div>
              </div>
            </div>
          </div>
          {/* Email Body */}
          <div className="flex-1 overflow-y-auto p-8 bg-[#faf9f8] flex justify-center">
            <div className="bg-white rounded-xl shadow-sm border border-[#edebe9] max-w-2xl w-full p-10 flex flex-col items-center h-fit">
              <div className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                {/* Simulated Cursor Logo */}
                <svg
                  fill="none"
                  height="32"
                  viewBox="0 0 32 32"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="#111111"></path>
                  <path d="M2 23L16 30L30 23V9L16 16L2 9V23Z" fill="#111111"></path>
                  <path d="M16 16L2 9V23L16 30V16Z" fill="#333333"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#111111] mb-6 w-full text-left">
                完成验证码挑战
              </h2>
              <p className="text-[#444444] text-base mb-8 w-full text-left leading-relaxed">
                我们已发送一次性验证码作为额外的安全检查。请在您打开的浏览器窗口中输入以下验证码以完成验证并继续身份认证。
              </p>
              <div className="text-4xl font-mono text-[#111111] tracking-widest w-full text-left mb-8">
                795649
              </div>
            </div>
          </div>
        </div>
        {/* END: Reading Pane */}
      </div>
      {/* END: MainContentArea */}
      {/* BEGIN: Bottom Status Bar */}
      <div className="h-8 bg-[#f3f2f1] border-t border-[#edebe9] flex items-center justify-between px-4 text-xs text-[#605e5c] shrink-0 z-10 relative">
        <div className="flex items-center space-x-4">
          <span className="">已连接</span>
          <span className="">所有文件夹均已更新。</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="">项目: 204</span>
        </div>
      </div>
      {/* END: Bottom Status Bar */}
    </div>
  );
}
