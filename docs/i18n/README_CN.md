# BrowserTools MCP

> 让您的AI工具更强大，能够与浏览器进行十倍意识和交互

[English](../../README.md) | 简体中文

此应用程序是一个强大的浏览器监控和交互工具，通过Anthropic的Model Context Protocol (MCP) 使AI应用程序能够通过Chrome扩展程序捕获和分析浏览器数据。

阅读我们的[文档](https://browsertools.agentdesk.ai/)获取完整的安装、快速入门和贡献指南。

## 路线图

查看我们的项目路线图：[Github Roadmap / Project Board](https://github.com/orgs/AgentDeskAI/projects/1/views/1)

## 更新

v1.2.0 已发布！以下是主要更新内容：
- 现在可以在Chrome开发工具面板中启用"Allow Auto-Paste into Cursor"功能。截图将自动粘贴到Cursor中（请确保在Cursor的Agent输入字段中聚焦/点击，否则可能无法工作！）
- 通过Lighthouse集成了SEO、性能、可访问性和最佳实践分析工具套件
- 实现了一个针对NextJS应用的特定提示，以改善SEO
- 添加了Debugger Mode工具，按特定顺序执行所有调试工具，并附带提示来改进推理
- 添加了Audit Mode工具，按特定顺序执行所有审计工具
- 解决了Windows连接问题
- 改进了BrowserTools服务器、扩展程序和MCP服务器之间的网络连接，包括自动发现主机/端口、自动重新连接和优雅关机机制
- 现在可以更方便地通过Ctrl+C退出BrowserTools服务器

## 快速入门指南

运行这个MCP工具需要三个组件：

1. 从这里安装我们的Chrome扩展程序：[v1.2.0 BrowserToolsMCP Chrome Extension](https://github.com/AgentDeskAI/browser-tools-mcp/releases/download/v1.2.0/BrowserTools-1.2.0-extension.zip)
2. 在IDE中运行此命令安装MCP服务器：`npx @agentdeskai/browser-tools-mcp@latest`
3. 在新终端中运行此命令：`npx @agentdeskai/browser-tools-server@latest`

* 不同的IDE有不同的配置，但此命令是一个很好的起点，请参考IDE的文档进行正确的配置设置

重要提示 - 需要安装两个服务器：
- browser-tools-server（本地NodeJS中间件服务器，用于收集日志）
- browser-tools-mcp（安装到IDE中的MCP服务器，与扩展程序和browser-tools-server通信）

`npx @agentdeskai/browser-tools-mcp@latest` 是在IDE中运行的命令
`npx @agentdeskai/browser-tools-server@latest` 是在新终端窗口中运行的命令

完成上述步骤后，打开Chrome的开发工具并进入BrowserToolsMCP面板。

如果仍然存在问题，请尝试以下步骤：
- 关闭浏览器。不仅仅是当前窗口，而是整个Chrome。
- 重新启动本地Node服务器（browser-tools-server）
- 确保您的浏览器中只有一个开发工具面板处于打开状态。

如果有任何问题或建议，欢迎随时提交issue！如果您有任何改进的想法，也可以提交带有enhancement标签的issue，或者通过[@tedx_ai on x](https://x.com/tedx_ai)与我联系。

---

## 🔑 关键新增功能

| 审计类型         | 描述                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **可访问性**     | 根据WCAG标准进行颜色对比度、缺失alt文本、键盘导航陷阱、ARIA属性等检查。                                                        |
| **性能**         | 通过Lighthouse分析渲染阻塞资源、过大的DOM结构、未优化的图片等影响页面速度的因素。                                           |
| **SEO**          | 评估页面的元数据、标题、链接结构等SEO相关因素，并提出改进建议以提高搜索可见性。                                             |
| **最佳实践**     | 检查网页开发中的一般最佳实践。                                                                                                    |
| **NextJS审计**   | 注入一个提示，用于对NextJS应用进行审计。                                                                                         |
| **Audit Mode**   | 按特定顺序运行所有审计工具。如果检测到NextJS框架，将运行对应的NextJS审计。                                                     |
| **Debugger Mode**| 按特定顺序运行所有调试工具。                                                                                                       |

---

## 🛠️ 使用审计工具

### ✅ **开始前的准备**

确保您已具备：
- 浏览器中的一个**活动标签页**
- **Chrome扩展程序已启用**

### ▶️ **运行审计**

**无头浏览器自动化**：  
Puppeteer自动化无头Chrome实例，加载页面并收集审计数据，即使对于SPA或通过JavaScript加载的内容也能确保结果的准确性。

无头浏览器实例在最后一次审计调用后保持活动状态**60秒**，以便高效处理连续的审计请求。

**结构化结果**：  
每个审计返回结构化的JSON格式结果，包含总体评分和详细的问题列表。这使得MCP客户端可以轻松解释发现并提供可行的见解。

MCP服务器提供了运行当前页面审计的工具。以下是触发它们的示例查询：

#### 可访问性审计 (`runAccessibilityAudit`)

确保页面符合可访问性标准，如WCAG。

> **示例查询：**
>
> - "此页面是否存在可访问性问题？"
> - "运行可访问性审计。"
> - "检查此页面是否符合WCAG标准。"

#### 性能审计 (`runPerformanceAudit`)

识别性能瓶颈和加载问题。

> **示例查询：**
>
> - "为什么这个页面加载这么慢？"
> - "检查此页面的性能。"
> - "运行性能审计。"

#### SEO审计 (`runSEOAudit`)

评估页面的搜索引擎优化情况。

> **示例查询：**
>
> - "如何改进此页面的SEO？"
> - "运行SEO审计。"
> - "检查此页面的SEO。"

#### 最佳实践审计 (`runBestPracticesAudit`)

检查网页开发中的一般最佳实践。

> **示例查询：**
>
> - "运行最佳实践审计。"
> - "检查此页面的最佳实践。"
> - "此页面是否存在最佳实践问题？"

#### Audit Mode (`runAuditMode`)

按特定顺序运行所有审计工具。如果检测到NextJS框架将运行对应的NextJS审计。

> **示例查询：**
>
> - "运行审计模式。"

#### NextJS审计 (`runNextJSAudit`)

检查NextJS应用的最佳实践和SEO改进。

> **示例查询：**
>
> - "运行NextJS审计。"
> - "运行NextJS审计，我使用的是app路由。"
> - "运行NextJS审计，我使用的是page路由。"

#### Debugger Mode (`runDebuggerMode`)

按特定顺序运行所有调试工具。

> **示例查询：**
>
> - "进入调试模式。"

## 架构

共有三个核心组件用于捕获和分析浏览器数据：

1. **Chrome扩展程序**：一个浏览器扩展程序，捕获截图、控制台日志、网络活动和DOM元素。
2. **Node服务器**：作为Chrome扩展程序和MCP服务器之间的中间件。
3. **MCP服务器**：实现了Model Context Protocol，为AI客户端提供标准化工具。

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌─────────────┐
│  MCP客户端  │ ──► │  MCP服务器   │ ──► │ Node服务器    │ ──► │ Chrome扩展  │
│  (例如      │ ◄── │  (协议处理)  │ ◄── │ (中间件)       │ ◄── │ 程序         │
│   Cursor)   │     │               │     │               │     │             │
└─────────────┘     └───────────────┘     └───────────────┘     └─────────────┘
```

Model Context Protocol (MCP) 是Anthropic AI模型支持的一种能力，允许创建自定义工具供兼容的客户端使用。MCP客户端如Claude Desktop、Cursor、Cline或Zed可以运行MCP服务器，这些服务器为客户端"教授"新的工具。

这些工具可以调用外部API，但在本案例中，**所有日志都仅存储在本地**机器上，绝不会发送到任何第三方服务或API。BrowserTools MCP运行一个本地的NodeJS API服务器，与Chrome扩展程序通信。

所有BrowserTools MCP服务器的使用者都可以通过相同的NodeJS API和Chrome扩展程序进行交互。

#### Chrome扩展程序

- 监控XHR请求/响应和控制台日志
- 跟踪选择的DOM元素
- 将日志和当前元素发送到BrowserTools连接器
- 通过Websocket服务器连接以捕获/发送截图
- 允许用户配置分词/截断限制和截图文件夹路径

#### Node服务器

- 担任Chrome扩展程序和MCP服务器之间的中间件
- 从Chrome扩展程序接收日志和当前选择的元素
- 处理来自MCP服务器的请求以捕获日志、截图或当前元素
- 向Chrome扩展程序发送Websocket命令以捕获截图
- 智能截断字符串和重复对象的数量，以避免分词限制
- 移除Cookie和敏感头信息，避免在与MCP客户端通信时发送

#### MCP服务器

- 实现了Model Context Protocol
- 为AI客户端提供标准化工具
- 兼容各种MCP客户端（Cursor、Cline、Zed、Claude Desktop等）

## 安装

安装步骤可在文档中找到：

- [BrowserTools MCP文档](https://browsertools.agentdesk.ai/)

## 使用

安装并配置后，该系统允许任何兼容的MCP客户端：

- 监控浏览器控制台输出
- 捕获网络流量
- 截取屏幕截图
- 分析所选元素
- 清除MCP服务器中存储的日志
- 运行可访问性、性能、SEO和最佳实践审计

## 兼容性

- 与任何兼容的MCP客户端协同工作
- 主要为Cursor IDE集成设计
- 支持其他AI编辑器和MCP客户端
